const {ApolloServer, gql} = require('apollo-server')

const typeDefs = gql`
type Query {
  games: [Game]
}

type Game {
  id: String!,
  round: Round!,
  season: Int!,
  seasonType: SeasonType!,
  isoKickoff: Int,
  stadium: String,
  awayTeam: Team!,
  homeTeam: Team!,
  awayCoach: String,
  homeCoach: String,
  awayOdds: Int,
  homeOdds: Int,
  awayScore: Int,
  homeScore: Int,
  quarter: Quarter,
  awayQuarterScores: [Int!],
  homeQuarterScores: [Int!],
  winner: String,
  gameState: GameState!,
  betType: BetType,
  bets: [Bet],
}

enum Quarter {
  Q1, Q2, HALFTIME, Q3, Q4, OT, FINAL, FINAL_OT
}

type Bet {
  pick: String,
  score: Int,
  player: String
}

enum SeasonType {
  REGULAR, POST
}

type Team {
  shortName: String,
  fullName: String,
  city: String,
  nickname: String,
  conference: Conference,
  division: String,
  color1: String,
  color2: String,
  color3: String,
  color4: String,
  logo: String,
  wordmark: String
}

enum Conference {
  AFC, NFC
}

enum GameState {
  UPCOMING,
  ONGOING,
  FINISHED
}

enum BetType {
  NO_ODDS,
  ODDS,
  WALLET
}

enum Round {
  REG1,
  REG2,
  REG3,
  REG4,
  REG5,
  REG6,
  REG7,
  REG8,
  REG9,
  REG10,
  REG11,
  REG12,
  REG13,
  REG14,
  REG15,
  REG16,
  REG17,
  REG18,
  POST_WC,
  POST_DIV,
  POST_CONF,
  POST_SB
}
`;

const server = new ApolloServer({
    typeDefs,
    mocks : true
})


server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });