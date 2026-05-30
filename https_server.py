#!/usr/bin/env python3
import http.server
import ssl
import os
import subprocess
import sys

PORT = 8443
CERTFILE = "cert.pem"
KEYFILE = "key.pem"

# Generate self-signed certificate if it doesn't exist
if not os.path.exists(CERTFILE) or not os.path.exists(KEYFILE):
    print("Generating self-signed certificate...")
    try:
        from cryptography import x509
        from cryptography.x509.oid import NameOID
        from cryptography.hazmat.primitives import hashes
        from cryptography.hazmat.backends import default_backend
        from cryptography.hazmat.primitives.asymmetric import rsa
        from cryptography.hazmat.primitives import serialization
        import datetime
        import ipaddress

        private_key = rsa.generate_private_key(
            public_exponent=65537,
            key_size=2048,
            backend=default_backend()
        )
        
        subject = issuer = x509.Name([
            x509.NameAttribute(NameOID.COMMON_NAME, u"localhost"),
        ])
        
        cert = x509.CertificateBuilder().subject_name(
            subject
        ).issuer_name(
            issuer
        ).public_key(
            private_key.public_key()
        ).serial_number(
            x509.random_serial_number()
        ).not_valid_before(
            datetime.datetime.utcnow()
        ).not_valid_after(
            datetime.datetime.utcnow() + datetime.timedelta(days=365)
        ).add_extension(
            x509.SubjectAlternativeName([
                x509.DNSName(u"localhost"),
                x509.DNSName(u"127.0.0.1"),
                x509.IPAddress(ipaddress.IPv4Address(u"127.0.0.1")),
            ]),
            critical=False,
        ).sign(private_key, hashes.SHA256(), default_backend())
        
        with open(CERTFILE, "wb") as f:
            f.write(cert.public_bytes(serialization.Encoding.PEM))
        
        with open(KEYFILE, "wb") as f:
            f.write(private_key.private_bytes(
                encoding=serialization.Encoding.PEM,
                format=serialization.PrivateFormat.TraditionalOpenSSL,
                encryption_algorithm=serialization.NoEncryption()
            ))
        
        print("Certificate generated successfully!")
    except ImportError:
        print("Installing cryptography...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", "cryptography"])
        print("Please run this script again.")
        sys.exit(1)

# Create HTTPS server
handler = http.server.SimpleHTTPRequestHandler
context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
context.load_cert_chain(CERTFILE, KEYFILE)

with http.server.HTTPServer(("localhost", PORT), handler) as httpd:
    httpd.socket = context.wrap_socket(httpd.socket, server_side=True)
    print(f"🔐 Serving HTTPS on https://localhost:{PORT}")
    print("Note: Your browser may show a security warning - this is normal.")
    print("Click 'Advanced' and proceed to continue.")
    httpd.serve_forever()
