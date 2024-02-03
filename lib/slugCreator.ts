const createSlug = (text: string) => {
  const slug = text.toLowerCase().replace(/\s+/g, '-');
  const cleanSlug = slug.replace(/[^a-zA-Z0-9-]/g, '');
  return cleanSlug;
};

export default createSlug;
