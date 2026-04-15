// Product image gallery stub for the product detail page
export function ProductGallery() {
  return (
    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="flex aspect-square items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
        Main image placeholder
      </div>
      <div className="grid grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="flex aspect-square items-center justify-center rounded-xl bg-gray-100 text-sm text-gray-300"
          >
            Thumb {i}
          </div>
        ))}
      </div>
    </div>
  );
}
