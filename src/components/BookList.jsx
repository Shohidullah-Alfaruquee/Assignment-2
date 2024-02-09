import BookItem from './BookItem';

const BookList = ({ bookList }) => {
  return (
    <>
      {bookList?.map((book) => (
        <BookItem key={book.id} book={book} />
      ))}
    </>
  );
};

export default BookList;
