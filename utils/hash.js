export async function hashValue(val) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(val, salt);
  return hash;
}
