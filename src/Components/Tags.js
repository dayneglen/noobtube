import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import '../Styles/tags.scss';

const Tags = props => {
  const [tagList, handleTagList] = useState([]),
      [searchInput, handleSearchInput] = useState(''),
      [tagInput, handleTagInput] = useState(''),
      activeVideo = useSelector(state => state.video)

  // will grab tags.  It will fire when the component mounts
  const grabTags = () => {
    axios.get(`/api/tags`)
    .then(res => handleTagList(res.data))
    .catch(err => console.log(err))
  }

  // this function will handle adding and removing tags from videos.  It will be invoked onClick of a tag in the tagList
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

  // if there isn't a suitable tag for a video, we want the ability to create a new tag.
  const newTag = () => {
    axios.post(`/api/tags/new/${activeVideo.video_id}`, {tag: tagInput})
    .then(res => handleTagList(res.data))
    .catch(err => console.log(err))
  }
  
  const mappedTags = tagList.map((tag, i) => {
    <div key={i}>
      
    </div>
  })

  return (
    <div className='tag-page'>
      <h2> {activeVideo.title} </h2>
      <section>
        <p> Search for a tag: </p>
        <input value={searchInput} onChange={e => handleSearchInput(e.target.value)} /> 
        <button onClick={() => handleSearchInput('')}> Clear </button>
      </section>
      <section>
        {mappedTags}
      </section>
      <section>
        <p> Can't find the tag you're looking for?  Make a new one!</p>
        <input value={tagInput} onChange={e => handleTagInput(e.target.value)} />
        <button onClick={() => handleTagInput('')}> Cancel </button>
        <button> Submit </button>
      </section>
    </div>
  )
}

export default Tags;