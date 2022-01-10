import React, {useState, useEffect} from 'react'
import firebase from './firebase' 
import BooksContainer from './components/BooksContainer'
import {GlobalStyle} from './styles'
import Header from './components/Header'
import DetailPanel from './components/DetailPanel'
import Search from './components/Search'
import {Transition} from 'react-transition-group'
import {getDatabase, ref, onValue} from 'firebase/database'

const App = () => {
  const [books, setBooks] = useState([])
  const [selectedBook, setSelectedBook] = useState(null)
  const [showPanel, setShowPanel] = useState(false)
  const [filteredBooks, setFilteredBooks] = useState([])

// starting from Juno notes - fetching data from firebase

  useEffect(() => {
    // create a variable that holds our database details
    const database = getDatabase(firebase)

    // we then create a variable that makes reference to our database
    const dbRef = ref(database)

    // add an event listener to that variable that will fire
    // from the database, and call that data 'response'.
    onValue(dbRef, (response) => {
      // here we use Firebase's .val() method to parse our database info the way we want it

      const firebaseBooks = []
      const data = response.val()
      for (let key in data) {
        const book = {
          id: key,
          title: data[key].title,
          author: data[key].author,
          image: data[key].image,
          description: data[key].description,
          published: data[key].published
        }
        firebaseBooks.push(book);
      }
      setBooks(firebaseBooks)
      setFilteredBooks(firebaseBooks)
    })
  }, [])

  useEffect(() => {

    const fetchData = async () => {
      try {
      const response = await fetch('https://book-club-json.herokuapp.com/books')
      const books = await response.json()
      //setBooks(books)
      //setFilteredBooks(books)
      } catch (errors) {
      }
    }

    fetchData()
  }, [])

  const pickBook = (book) => {
    setSelectedBook(book)
    setShowPanel(true)
  }

  const closePanel = () => {
    setShowPanel(false)
  }

  const filterBooks = (searchTerm) => {
    const stringSearch = (bookAttribute, searchTerm) => (
      bookAttribute.toLowerCase().includes(searchTerm.toLowerCase())
    )
    if (!searchTerm) {
      setFilteredBooks(books)
    } else {
      setFilteredBooks(books.filter((book) => stringSearch(book.title, searchTerm) || stringSearch(book.author, searchTerm)
      ))     
      }
    }

    const hasFiltered = filteredBooks.length !== books.length

  return (
    <>
      <GlobalStyle />
      <Header>
        <Search filterBooks={filterBooks} />
      </Header>
      <BooksContainer books={filteredBooks} pickBook={pickBook} isPanelOpen={showPanel} title={hasFiltered ? 'search results' : 'All books'} />
      <Transition in={showPanel} timeout={300}>
      {(state) =>
        <DetailPanel book={selectedBook} closePanel={closePanel} state={state} />}
      </Transition>
    </>
  )
}

export default App
