import SearchBox from './SearchBox';
import Sort from './Sort';
import BookList from './BookList';
import { useState } from 'react';
import books from '../data/bookList';

const BookFinderApp = () => {
  const [bookList, setBookList] = useState(books);
  const [searchText, setSearchText] = useState('');

  const filteredBookList = bookList.filter((book) => {
    let text = new RegExp(`${searchText}`, 'i');
    return text.test(book.bookName.trim());
  });

  const handleSortChange = (e) => {
    // to keep original array safe from sorting, it need to copy
    let sortedBooks = [...bookList];
    const sortBy = e.target.value;

    switch (sortBy) {
      case 'name_asc':
        sortedBooks.sort((a, b) =>
          // trim method is applied only for ignoing white space in both side of book name.
          a.bookName.trim().localeCompare(b.bookName.trim())
        );
        break;
      case 'name_desc':
        sortedBooks.sort((a, b) =>
          // trim method is applied only for ignoing white space in both side of book name.
          b.bookName.trim().localeCompare(a.bookName.trim())
        );
        break;
      case 'year_asc':
        sortedBooks.sort((a, b) => a.publishedYear - b.publishedYear);
        break;
      case 'year_desc':
        sortedBooks.sort((a, b) => b.publishedYear - a.publishedYear);
        break;
      default:
        break;
    }
    setBookList(sortedBooks);
  };

  return (
    <main className="my-10 lg:my-14">
      <header className="mb-8 lg:mb-10 mx-auto max-w-7xl">
        <div className="mx-auto flex items-end justify-between max-md:max-w-[95%] max-md:flex-col max-md:items-start max-md:space-y-4">
          <div>
            <h6 className="mb-2 text-base lg:text-xl">Trending on 2021</h6>
            <h2 className="mb-6 font-['Playfair_Display'] text-3xl font-bold lg:text-4xl">
              Trending Books of the Year
            </h2>
            <SearchBox
              searchText={searchText}
              onSearchHandler={setSearchText}
            />
          </div>

          <Sort sortingHandler={handleSortChange} />
        </div>
      </header>
      <div className="container mx-auto grid grid-cols-1 gap-8 max-w-7xl md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <BookList
          bookList={searchText.length > 0 ? filteredBookList : bookList}
        />
      </div>
    </main>
  );
};
export default BookFinderApp;
