import sanityClient from '@sanity/client';

export const client = sanityClient({
  projectId: 'erxyk65j',
  dataset: 'production',       
  apiVersion: '2025-05-26',    
  useCdn: false,
//    token: 'skmna9N40agSjX22PEzWm6yswyR70PdJVedzwPRJDsXUU2vPUV8YCRlkZLdZE8g2NnBJIFLKoILOcvJgwDB88KUEmwwWnypD5nm99U6ichEg4foitvD6WAtUUu2BM4QBGlzsZZx6TkeJPeueJDRnDgsVEBfEYnZWaQ4MeVRanisEtnhHhHwk',
});