import '../CategoriesList/CategoriesList.css'
import '../CategoryItem/CategoryItem.css'
import './CategoriesSkeleton.css'

const CategoriesSkeleton = () => (
  <ul className="categories">
    {Array.from({ length: 20 }).map((_, index) => (
      <li
        key={index}
        className="categories__category category category--loading"
      >
        <span className="category__img category__img--loading"></span>
        <h3 className="category__title category__title--loading"></h3>
      </li>
    ))}
  </ul>
)

export default CategoriesSkeleton
