"use client";
import { Navbar } from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { SectionTitle } from "@/components/ui/text/SectionTitle";

export default function PolitiqueConfidentialite() {
  return (
    <div className="relative min-h-screen w-full font-sans bg-linear-to-t from-black via-blue-950 to-black">
      <Navbar solid />

      <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14 py-16 mt-24">
        <div className="w-full flex flex-col items-center justify-center gap-16">
          <SectionTitle
            label="Informations"
            title="POLITIQUE DE CONFIDENTIALITÉ"
            text="Dernière mise à jour : janvier 2025"
            darkMode={true}
          />

          <div className="w-full prose prose-lg max-w-none space-y-6 text-white">
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-white">1. Collecte des données</h2>
              <p className="text-white/90">
                Double-O Car collecte et traite les données personnelles que vous nous fournissez lors de l&apos;utilisation de nos services, notamment :
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2 text-white/90">
                <li>Nom, prénom et coordonnées (email, téléphone, adresse)</li>
                <li>Informations de paiement (traitées de manière sécurisée)</li>
                <li>Informations de réservation de véhicules</li>
                <li>Données de navigation et cookies</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-white">2. Utilisation des données</h2>
              <p className="text-white/90">
                Vos données personnelles sont utilisées pour :
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2 text-white/90">
                <li>Traiter vos réservations de véhicules</li>
                <li>Gérer vos locations et contrats</li>
                <li>Vous contacter concernant vos réservations</li>
                <li>Améliorer nos services et votre expérience utilisateur</li>
                <li>Respecter nos obligations légales et réglementaires</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-white">3. Partage des données</h2>
              <p className="text-white/90">
                Nous ne vendons jamais vos données personnelles. Nous pouvons partager vos informations avec :
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2 text-white/90">
                <li>Nos prestataires de services (hébergement, paiement, envoi d&apos;emails)</li>
                <li>Nos partenaires de location de véhicules</li>
                <li>Les autorités compétentes si la loi l&apos;exige</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-white">4. Sécurité des données</h2>
              <p className="text-white/90">
                Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre tout accès non autorisé, perte, destruction ou altération.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-white">5. Vos droits</h2>
              <p className="text-white/90">
                Conformément au RGPD, vous disposez des droits suivants :
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2 text-white/90">
                <li>Droit d&apos;accès à vos données personnelles</li>
                <li>Droit de rectification des données inexactes</li>
                <li>Droit à l&apos;effacement de vos données</li>
                <li>Droit à la limitation du traitement</li>
                <li>Droit à la portabilité de vos données</li>
                <li>Droit d&apos;opposition au traitement</li>
              </ul>
              <p className="mt-4 text-white/90">
                Pour exercer ces droits, contactez-nous à : <a href="mailto:contact@double-o-car.fr" className="text-[#003CF0] underline hover:text-[#0034D0]">contact@double-o-car.fr</a>
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-white">6. Cookies</h2>
              <p className="text-white/90">
                Notre site utilise des cookies pour améliorer votre expérience de navigation. Vous pouvez gérer vos préférences de cookies dans les paramètres de votre navigateur.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-white">7. Modifications</h2>
              <p className="text-white/90">
                Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Les modifications seront publiées sur cette page avec une mise à jour de la date de dernière modification.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-white">8. Contact</h2>
              <p className="text-white/90">
                Pour toute question concernant cette politique de confidentialité, vous pouvez nous contacter à :
              </p>
              <p className="mt-2 text-white/90">
                <strong>Email :</strong> <a href="mailto:contact@double-o-car.fr" className="text-[#003CF0] underline hover:text-[#0034D0]">contact@double-o-car.fr</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}


