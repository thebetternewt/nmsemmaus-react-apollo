import gql from 'graphql-tag';

const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`;

const CURRENT_USER_QUERY = gql`
  query CurrentUserQuery {
    me {
      id
      username
      admin
    }
  }
`;

const AUTH_QUERY = gql`
  query AuthQuery {
    isAuthenticated @client
  }
`;

const REDIRECT_QUERY = gql`
  query RedirectQuery {
    redirectPath @client
  }
`;

const WALK_QUERY = gql`
  query WalkQuery($walkNumber: Int!) {
    walk(walkNumber: $walkNumber) {
      walkNumber
      startDate
      endDate
      pilgrims {
        id
        lastName
        firstName
        hometown
        sponsor
        walkNumber
      }
    }
  }
`;

const WALKS_QUERY = gql`
  query WalksQuery {
    walks {
      id
      walkNumber
      startDate
      endDate
      gender
    }
  }
`;

const UPCOMING_WALKS_QUERY = gql`
  query UpcomingWalksQuery($afterDate: String!) {
    walks(afterDate: $afterDate) {
      id
      walkNumber
      startDate
      endDate
      gender
    }
  }
`;

const NEWSLETTERS_QUERY = gql`
  query NewslettersQuery {
    newsletters {
      id
      title
      body
      publishedOn
      documentUrl
      createdAt
      updatedAt
    }
  }
`;

const LATEST_NEWSLETTER_QUERY = gql`
  query LatestNewsletterQuery {
    latestNewsletter {
      id
      title
      body
      publishedOn
      documentUrl
      createdAt
      updatedAt
    }
  }
`;

const NEWSLETTER_QUERY = gql`
  query NewsletterQuery($id: ID!) {
    newsletter(id: $id) {
      id
      title
      body
      publishedOn
      documentUrl
      createdAt
      updatedAt
    }
  }
`;

const BOARD_QUERY = gql`
  query BoardQuery($year: ID!) {
    board(year: $year) {
      id
      year
      chairman
      viceChairman
      treasurer
      secretary
      communitySpiritualDirector
      exOfficio
    }
  }
`;
const CURRENT_BOARD = gql`
  query CurrentBoardQuery {
    currentBoard {
      id
      year
      chairman
      viceChairman
      treasurer
      secretary
      communitySpiritualDirector
      exOfficio
    }
  }
`;

const BOARDS_QUERY = gql`
  query BoardsQuery($limit: Int) {
    boards(limit: $limit) {
      id
      year
      chairman
      viceChairman
      treasurer
      secretary
      communitySpiritualDirector
      exOfficio
    }
  }
`;

export {
  LOGIN_MUTATION,
  AUTH_QUERY,
  REDIRECT_QUERY,
  CURRENT_USER_QUERY,
  WALK_QUERY,
  WALKS_QUERY,
  UPCOMING_WALKS_QUERY,
  NEWSLETTERS_QUERY,
  LATEST_NEWSLETTER_QUERY,
  NEWSLETTER_QUERY,
  CURRENT_BOARD,
  BOARD_QUERY,
  BOARDS_QUERY,
};
