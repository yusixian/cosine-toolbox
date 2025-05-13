import { Cherry_Bomb_One, Poppins } from 'next/font/google';

export const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-poppins' });
export const cherryBombOne = Cherry_Bomb_One({ subsets: ['latin'], weight: ['400'], variable: '--font-cherry-bomb-one' });

export const fontVariants = [poppins.variable, cherryBombOne.variable];
