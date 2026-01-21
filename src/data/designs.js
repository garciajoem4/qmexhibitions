// Design projects data with local images
// Each design has a folder in assets/images/designs/

export const designProjects = [
  {
    id: 'adipec',
    title: 'ADIPEC',
    slug: 'adipec',
    category: 'designs',
    folder: 'adipec',
  },
  {
    id: 'airavat',
    title: 'AIRAVAT',
    slug: 'airavat',
    category: 'designs',
    folder: 'airavat',
  },
  {
    id: 'al-fanar-gas',
    title: 'AL FANAR GAS',
    slug: 'al-fanar-gas',
    category: 'designs',
    folder: 'al fanar gas',
  },
  {
    id: 'al-gharbia-pipe',
    title: 'AL GHARBIA PIPE',
    slug: 'al-gharbia-pipe',
    category: 'designs',
    folder: 'al gharbia pipe',
  },
  {
    id: 'ascott-2025',
    title: 'ASCOTT 2025',
    slug: 'ascott-2025',
    category: 'designs',
    folder: 'ascott 2025',
  },
  {
    id: 'asepto-uflex',
    title: 'ASEPTO UFLEX',
    slug: 'asepto-uflex',
    category: 'designs',
    folder: 'asepto uflex',
  },
  {
    id: 'asm',
    title: 'ASM',
    slug: 'asm',
    category: 'designs',
    folder: 'asm',
  },
  {
    id: 'azercosmos',
    title: 'AZERCOSMOS',
    slug: 'azercosmos',
    category: 'designs',
    folder: 'azercosmos',
  },
  {
    id: 'brother',
    title: 'BROTHER',
    slug: 'brother',
    category: 'designs',
    folder: 'brother',
  },
  {
    id: 'dubai-airshow',
    title: 'DUBAI AIRSHOW',
    slug: 'dubai-airshow',
    category: 'designs',
    folder: 'dubai airshow',
  },
  {
    id: 'eos',
    title: 'EOS',
    slug: 'eos',
    category: 'designs',
    folder: 'eos',
  },
  {
    id: 'fsl',
    title: 'FSL',
    slug: 'fsl',
    category: 'designs',
    folder: 'fsl',
  },
  {
    id: 'genel',
    title: 'GENEL',
    slug: 'genel',
    category: 'designs',
    folder: 'genel',
  },
  {
    id: 'ingram',
    title: 'INGRAM',
    slug: 'ingram',
    category: 'designs',
    folder: 'ingram',
  },
  {
    id: 'logicom',
    title: 'LOGICOM',
    slug: 'logicom',
    category: 'designs',
    folder: 'logicom',
  },
  {
    id: 'may-fairjets',
    title: 'MAY FAIRJETS',
    slug: 'may-fairjets',
    category: 'designs',
    folder: 'may fairjets',
  },
  {
    id: 'meshkati',
    title: 'MESHKATI',
    slug: 'meshkati',
    category: 'designs',
    folder: 'meshkati',
  },
  {
    id: 'millennium-hotels',
    title: 'MILLENNIUM HOTELS & RESORTS',
    slug: 'millennium-hotels',
    category: 'designs',
    folder: 'millennium hotels and resorts',
  },
  {
    id: 'mindware',
    title: 'MINDWARE',
    slug: 'mindware',
    category: 'designs',
    folder: 'mindware',
  },
  {
    id: 'nmk',
    title: 'NMK',
    slug: 'nmk',
    category: 'designs',
    folder: 'nmk',
  },
  {
    id: 'redington',
    title: 'REDINGTON',
    slug: 'redington',
    category: 'designs',
    folder: 'redington',
  },
  {
    id: 'tanmiah',
    title: 'TANMIAH',
    slug: 'tanmiah',
    category: 'designs',
    folder: 'tanmiah',
  },
];

// Function to dynamically import all images from a design folder
export const getDesignImages = async (folder) => {
  const images = import.meta.glob('/src/assets/images/designs/**/*.{webp,png,jpg,jpeg}', { eager: true });
  
  const folderImages = Object.entries(images)
    .filter(([path]) => path.includes(`/designs/${folder}/`))
    .map(([path, module]) => ({
      path,
      src: module.default,
      name: path.split('/').pop().replace(/\.(webp|png|jpg|jpeg)$/, ''),
    }))
    .sort((a, b) => {
      // Sort by artboard number
      const numA = parseInt(a.name.match(/\d+/) || [0]);
      const numB = parseInt(b.name.match(/\d+/) || [0]);
      return numA - numB;
    });

  return folderImages;
};

// Get first image for featured/thumbnail
export const getDesignFeaturedImage = (folder) => {
  const images = import.meta.glob('/src/assets/images/designs/**/*.{webp,png,jpg,jpeg}', { eager: true });
  
  const folderImages = Object.entries(images)
    .filter(([path]) => path.includes(`/designs/${folder}/`))
    .map(([path, module]) => ({
      path,
      src: module.default,
      name: path.split('/').pop().replace(/\.(webp|png|jpg|jpeg)$/, ''),
    }))
    .sort((a, b) => {
      const numA = parseInt(a.name.match(/\d+/) || [0]);
      const numB = parseInt(b.name.match(/\d+/) || [0]);
      return numA - numB;
    });

  return folderImages[0]?.src || null;
};
