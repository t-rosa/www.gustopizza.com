import '@/styles/globals.css'
import { PropsWithChildren } from 'react'

export const metadata = {
  title: 'Gusto Pizza',
  description: "Gusto Pizza est une chaîne de pizzerias française authentique qui offre une fusion passionnante de tradition et de modernité. Réputée pour ses recettes artisanales, elle utilise des ingrédients frais et locaux pour créer une variété de pizzas savoureuses qui plairont à tous les palais. Dans chaque restaurant Gusto Pizza, attendez-vous à une ambiance conviviale et accueillante, où vous pourrez déguster des pizzas cuites au four à bois, des antipasti authentiques et une sélection de vins italiens sélectionnés avec soin. Gusto Pizza est bien plus qu'une pizzeria, c'est une véritable célébration de la cuisine italienne au cœur de la France.",
}

export default function RootLayout({ children, }: PropsWithChildren) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
