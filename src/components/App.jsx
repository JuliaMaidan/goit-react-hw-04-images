import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Spinner } from "./Loader/Loader";
import { Modal } from "./Modal/Modal";
import { Button } from "./Button/Button";
import { ToastContainer, toast } from 'react-toast';
import { fetchImages } from '../services/fetchImages';

export const App = () => {

  const [search, setSearch] = useState('')
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [error, setError] = useState(null)

  const handleFormSubmit = (search) => {
    setSearch(search)
    setPage(1)
  }

  const onLoadMore = () => {
    setPage(prevPage => (prevPage + 1));
  };

  const toggleModal = (selectedImage) => {
    setShowModal((showModal) => !showModal)
    setSelectedImage(selectedImage)
  }

  useEffect(() => {
    const fetchImageData = async () => {
      setLoading(true)

      try {
        const data = await fetchImages(search, page)
        setImages((prevImages) => [...prevImages, ...data])
        setError(null)
      } catch (error) {
        toast.error(error.message);
        setError(error)
      }
      setLoading(false);
    };

    const prevSearch = search;

    if (search && (page === 1 || search !== prevSearch)) {
      setImages([])
      fetchImageData()
    } else if (page > 1) {
      fetchImageData()
    }
  }, [search, page])

  return (
    <div>
      <Searchbar onSubmit={handleFormSubmit} />
      {images.length > 0 && <ImageGallery
        images={images}
        toggleModal={toggleModal}
      />}
      {!loading && images.length > 0 && images.length % 12 === 0 && <Button onClick={onLoadMore} />}
      {loading && <Spinner />}
      {showModal && <Modal onClose={toggleModal}> 
        <img src={selectedImage.largeImageURL} alt="" width='100%' /></Modal>}
      {error && <ToastContainer position='bottom-left' delay='3000' />}
      <ToastContainer position='bottom-left' delay='3000' />
    </div>
  )
};