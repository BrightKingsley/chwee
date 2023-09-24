//@ts-ignore
import jwt, { JwtPayload } from "jsonwebtoken";

interface SignOptions {
  expiresIn?: string | number;
}

const DEFAULT_SIGN_OPTION: SignOptions = {
  expiresIn: "1h",
};

export function signJwtAccessToken({
  payload,
  options = DEFAULT_SIGN_OPTION,
}: {
  payload: JwtPayload;
  options?: SignOptions;
}) {
  const secret_key = process.env.NEXTAUTH_SECRET;
  const token = jwt.sign(payload, secret_key!, options);
  return token;
}

export function verifyJwt(token: string): JwtPayload | null {
  try {
    const secret_key = process.env.NEXTAUTH_SECRET;
    if (!secret_key) return null;
    const decoded = jwt.verify(token, secret_key);

    return decoded as JwtPayload;
  } catch (error) {
    console.log(error);

    return null;
  }
}
