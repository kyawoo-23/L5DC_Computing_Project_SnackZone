export const hashPassword = async (
  password: string,
  userId: string
): Promise<string> => {
  const salt = new TextEncoder().encode(userId);
  const combinedData = concatenateUint8Arrays(
    salt,
    new TextEncoder().encode(password)
  );

  try {
    const hashBuffer = await crypto.subtle.digest("SHA-256", combinedData);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");

    return hashHex;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

function concatenateUint8Arrays(...arrays: Uint8Array[]): Uint8Array {
  // Calculate total length
  const totalLength = arrays.reduce((acc, arr) => acc + arr.length, 0);

  // Create result array
  const result = new Uint8Array(totalLength);

  // Copy arrays into result
  let offset = 0;
  for (const arr of arrays) {
    result.set(arr, offset);
    offset += arr.length;
  }

  return result;
}
