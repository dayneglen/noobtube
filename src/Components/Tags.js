import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { FaSearch } from "react-icons/fa";
import '../Styles/tags.scss';

const Tags = props => {
  const [tagList, handleTagList] = useState([]),
      [filteredTagList, setFilteredTagList] = useState([]),
      [videoTags, handleVideoTags] = useState([]),
      [unusedTags, handleUnusedTags] = useState([]),
      [searchInput, handleSearchInput] = useState(''),
      [tagInput, handleTagInput] = useState(''),
      activeVideo = useSelector(state => state.video)

  // will grab tags.  It will fire when the component mounts
  const grabTags = () => {
    axios.get(`/api/tags`)
    .then(res => {
        handleTagList(res.data);
        setFilteredTagList(res.data);      
    }  )
    .catch(err => console.log(err))
    axios.get(`/api/tags/${activeVideo.video_id}`)
    .then(res => handleVideoTags(res.data))
    .catch(err => console.log(err))
  }

  const toggleTag = (tag) => {
    const tagCheck = tagList.filter(item => item === tag)
    if (tagCheck) {
      // remove tag
      axios.delete(`/api/tags/${activeVideo.video_id}`)
      .then(res => handleTagList(res.data))
      .catch(err => console.log(err))
    } else {
      // add tag
      axios.post(`/api/tags/${activeVideo.video_id}`)
      .then(res => handleTagList(res.data))
      .catch(err => console.log(err))
    }
  }

  const addTag = (tag_id) => {
    axios.post(`/api/tags/${activeVideo.video_id}`, { tag_id })
    .then(res => handleVideoTags(res.data))
    .catch(err => console.log(err))
  }

  const removeTag = (tag_id) => {
    console.log(tag_id)
    axios.delete(`/api/tags/${activeVideo.video_id}/${tag_id}`)
    .then(res => handleVideoTags(res.data))
    .catch(err => console.log(err))
  }

  // if there isn't a suitable tag for a video, we want the ability to create a new tag.
  const newTag = () => {
    let tag = tagInput
    console.log(tag)
    axios.post(`/api/new/tags`, {tag})
    .then(res => handleTagList(res.data))
    .catch(err => console.log(err))
  }

  useEffect(() => {
    grabTags()
  }, [activeVideo])

  useEffect(() => {
    handleUnusedTags(tagList.filter(el => {
      // console.log(el)
      return !videoTags.includes(el)
    }))
  }, [tagList, videoTags])

  useEffect (() => {
    if (searchInput === ''){
      return
    }
    setFilteredTagList(tagList.filter(tag => tag.name.toLowerCase().includes(searchInput) ))
  }, [searchInput, tagList])

  useEffect(() => {
    // console.log(videoTags)
    // console.log(tagList)
  }, [videoTags, tagList])

  const mappedTagList = tagList.map((t, i) => {
    let tagged = false
    videoTags.forEach((val, index) => {
      if (videoTags[index].tag_id === t.tag_id) {
        tagged = true
      }
    })
    return(
    <div key={i} className='tag'>
      {tagged ? (
        <button onClick={() => {
          // console.log(t.tag_id)
          removeTag(t.tag_id)
        }}> Remove Tag </button>
      ) : (
        <button onClick={() => addTag(t.tag_id)}> Add Tag </button>
      )}
      <p>{t.name}</p>
    </div>
  )})

  const filteredMappedTagList = filteredTagList.map((t, i) => {
    let tagged = false;
    videoTags.forEach((val, index) => {
      if (videoTags[index].tag_id === t.tag_id) {
        tagged = true;
      }
    });
    return (
      <div key={i} className='tag'>
        {tagged ? (
          <button
            onClick={() => {
              // console.log(t.tag_id)
              removeTag(t.tag_id);
            }}
          >
            {" "}
            Remove Tag{" "}
          </button>
        ) : (
          <button onClick={() => addTag(t.tag_id)}> Add Tag </button>
        )}
        <p> {t.name} </p>
      </div>
    );
  });
  console.log(tagList)

  return (
    <div className='tag-page'>
      <h2> {activeVideo.title} </h2>
      <section className='tag-search'>
        <div className='search-bar'>
          <input placeholder='Search for a tag' value={searchInput} onChange={e => handleSearchInput(e.target.value)} />
          <button onClick={() => handleSearchInput('')}> Clear </button> 
        </div> 
      </section>
      <section className='tag-list'>
        <p> Tags: </p>
        {searchInput.length === 0 ? mappedTagList : filteredMappedTagList }
      </section>
      <section className='tag-create'>
        <p> Can't find the tag you're looking for?  Make a new one!</p>
        <div className='input-line'>
          <input value={tagInput} onChange={e => handleTagInput(e.target.value)} />
          <div>
            <button onClick={() => handleTagInput('')}> &#10007; </button>
            <button onClick={() => {
            newTag() 
            handleTagInput('')}}> &#10003; </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Tags;