import { gql } from '@apollo/client'

export default gql`
query searchGif($term: String!) {
    searchGif(term: $term)
}`