export default {
  participants: ['Joren', 'Felix', 'Maurice', 'Cornelis', 'Henri', 'Arjan', 'Martijn'],
  appKey: 'c5ad7060f7e815272acf455b932bd7db481e1ac927e54161b9637da5',
  admins: ['Joren'],
  adminPassword: 'pines',
  title: 'Workshop',
  targetOptions: {
    mode: 'module',
  },
  templateData: {
    participantNameLower() {
      return this.participantName.toLowerCase();
    },
  },
};
