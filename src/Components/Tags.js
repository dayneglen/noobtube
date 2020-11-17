import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import '../Styles/tags.scss';

const Tags = props => {
  const [tagList, handleTagList] = useState([]),
      [videoTags, handleVideoTags] = useState([]),
      [unusedTags, handleUnusedTags] = useState([]),
      [searchInput, handleSearchInput] = useState(''),
      [tagInput, handleTagInput] = useState(''),
      activeVideo = useSelector(state => state.video)

  // will grab tags.  It will fire when the component mounts
  const grabTags = () => {
    axios.get(`/api/tags`)
    .then(res => handleTagList(res.data))
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
    axios.delete(`/api/tags/${activeVideo.video_id}`, { tag_id })
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
    handleUnusedTags(tagList.filter(el => videoTags.includes(el)))
  }, [tagList, videoTags])

  useEffect(() => {
    console.log(videoTags)
    console.log(tagList)
  }, [videoTags])
  
  const mappedTags = videoTags.map((t, i) => (
    <div key={i}>
      { t.name } <button onClick={() => {removeTag(t.tag_id)}}> x </button>
    </div>
  ))

  const mappedUnused = unusedTags.map((t, i) => (
    <div key={i}>
      { t.name } <button onClick={() => addTag(t.tag_id)}> x </button>
    </div>
  ))

  return (
    <div className='tag-page'>
      <h2> {activeVideo.title} </h2>
      <section>
        <p> Search for a tag: </p>
        <input value={searchInput} onChange={e => handleSearchInput(e.target.value)} /> 
        <button onClick={() => handleSearchInput('')}> Clear </button>
      </section>
      <section>
        <p> Tags on this video: </p>
        { mappedTags }
        <p> Other Tags: </p>
        { mappedUnused }
      </section>
      <section>
        <p> Can't find the tag you're looking for?  Make a new one!</p>
        <input value={tagInput} onChange={e => handleTagInput(e.target.value)} />
        <button onClick={() => handleTagInput('')}> Cancel </button>
        <button onClick={() => newTag()}> Submit </button>
      </section>
    </div>
  )
}

export default Tags;