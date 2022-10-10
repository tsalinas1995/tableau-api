
import jwt
import datetime
import uuid

connectedAppClientId = "4c4fdb86-7920-449a-97ee-e1403dbcdf17"
connectedAppSecretId = "c3fe5b7e-f35a-4e32-822f-6ca682f0c28d"
connectedAppSecretKey = "2CXdVZ5Mg9BhsYPS0tH1QgVgFtWA3BfYOwrQIrtZXSw="
user = "tomas_10101995@hotmail.com"

token = jwt.encode(
    {
        "iss": connectedAppClientId,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=5),
        "jti": str(uuid.uuid4()),
        "aud": "tableau",
        "sub": user,
        "scp": ["tableau:views:embed", "tableau:metrics:embed", "tableau:views:embed_authoring"]
    },
    connectedAppSecretKey,
    algorithm="HS256",
    headers={
        'kid': connectedAppSecretId,
        'iss': connectedAppClientId
    }
)

print(token)