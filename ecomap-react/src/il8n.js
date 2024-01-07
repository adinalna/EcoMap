// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          about: {
            p1: 'Trillions of plastic-tipped cigarette butts leech chemicals and microplastics into the environment.',
            p2: 'The result?',
            p3: 'Massive amounts of nicotine and other toxic chemicals get released.',
            p4: 'These toxic chemicals bio-accumulate in various plants and animals. Some of which we eat.',
            p5: 'An environmental emergency is at our fingertips.',
            li1: 'Just take a photo',
            li2: 'Tag the litter',
            li3: 'Upload it',
            p6: 'Every year, millions of tonnes of plastic makes its way from land to sea.',
            p7: 'Where it becomes significantly more damaging, more difficult, & more expensive to remove.',
            p8: 'The illusion of "urban cleaning" is facilitated by infrastructural design.'
          },
        },
      },
      my: {
        translation: {
          about: {
            p1: 'Bertrilion-trilion puntung rokok berujung plastik membuang bahan kimia lintah dan mikroplastik ke alam sekitar.',
            p2: 'Kesannya?',
            p3: 'Sejumlah besar nikotin dan bahan kimia toksik lain dibebaskan.',
            p4: 'Bahan kimia toksik ini terkumpul secara bio dalam pelbagai tumbuhan dan haiwan. Sebahagian daripadanya kita makan.',
            p5: 'Kecemasan alam sekitar berada di hujung jari kita.',
            li1: 'Hanya ambil gambar',
            li2: 'Tag sampah',
            li3: 'Muatnaikkannya',
            p6: 'Setiap tahun, berjuta-juta tan plastik mengalir dari darat ke laut.',
            p7: 'Menjadikannya lebih merosakkan, lebih sukar, & lebih mahal untuk dibuang.',
            p8: 'Ilusi "pembersihan bandar" difasilitasi oleh reka bentuk infrastruktur.'
          },
        },
      },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
