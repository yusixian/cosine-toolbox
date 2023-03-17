import { Noto_Sans_SC, Poppins } from 'next/font/google';

export const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-poppins' });

export const noto_sans_sc = Noto_Sans_SC({ subsets: ['latin'], weight: ['400', '500', '700', '900'], variable: '--font-sc' });
