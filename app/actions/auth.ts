"use server";

export async function verifyPassword(password: string): Promise<boolean> {
  const correctPassword = process.env.ADMIN_PASSWORD;
  
  if (!correctPassword) {
    console.warn("ADVARSEL: ADMIN_PASSWORD miljøvariablen er ikke sat. Admin login vil fejle.");
    return false;
  }
  
  return password === correctPassword;
}
