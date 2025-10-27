import { reviews } from "@/data/reviews";

export default function Reviews() {
  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-montserrat font-semibold font-weight-600 text-white text-center mb-8 sm:mb-10 md:mb-12">
          Vos avis
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg">
              <div className="mb-3 sm:mb-4">
                <h3 className="font-montserrat font-semibold font-weight-600 text-black text-base sm:text-lg text-center">
                  {review.name}
                </h3>
              </div>
              <p className="font-montserrat font-regular font-weight-400 text-black text-sm sm:text-base leading-relaxed">
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
