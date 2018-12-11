/* eslint react/no-did-mount-set-state: 0 */
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Movie from './Movie';
import { connect } from 'react-redux'
import { getMovies } from './actions'
import { bindActionCreators } from 'redux'

class MoviesList extends PureComponent {

  async componentDidMount() {
    const { getMovies, isLoaded, moviesLoadedAt } = this.props
    const oneHour = 60 * 60 * 1000
    try {
      if (!isLoaded || ((new Date()) - moviesLoadedAt) > oneHour) await this.props.getMovies()
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { movies, isLoaded } = this.props
    if (!isLoaded) return <h1>Loading!</h1>
    return (
      <MovieGrid>
        {movies.map(movie => <Movie key={movie.id} movie={movie} />)}
      </MovieGrid>
    );
  }
}

const mapStateToProps = ({movies: { movies, moviesLoaded, moviesLoadedAt }}) => ({
  movies,
  isLoaded: moviesLoaded,
  moviesLoadedAt,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getMovies,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MoviesList);

const MovieGrid = styled.div`
  display: grid;
  padding: 1rem;
  grid-template-columns: repeat(6, 1fr);
  grid-row-gap: 1rem;
`;
