const {ApolloServer, gql} = require('apollo-server')
const {faker} = require('@faker-js/faker') ;

const typeDefs = gql`
schema {
    query: Query
}
type Query {
    getGame(id: String!): Game
    getTeam(shortName: String!): Team
    getTeams(includeHistorical: Boolean = false): [Team]!
    currentRound: [Game]!
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
    awayOdds: Float,
    homeOdds: Float,
    awayScore: Int,
    homeScore: Int,
    quarter: Quarter,
    awayQuarterScores: [Int!],
    homeQuarterScores: [Int!],
    winner: Side,
    gameState: GameState!,
    bettingState: BettingState!,
    bettingType: BettingType,
    bets: [Bet],
}
enum Quarter {
    Q1, Q2, HALFTIME, Q3, Q4, OT, FINAL, FINAL_OT
}
enum Side {
    HOME, AWAY, TIE, NONE
}
type Bet {
    id: String!
    player: String!,
    pick: Side!,
    stake: Int,
    score: Int,
    open: Boolean
}
enum SeasonType {
    REGULAR, POST
}
type Team {
    shortName: String!,
    fullName: String!,
    city: String!,
    nickname: String!,
    conference: Conference!,
    division: String!,
    color1: String!,
    color2: String!,
    color3: String,
    color4: String,
    logo: String!,
    wordmark: String!
}
enum Conference {
    AFC, NFC
}
enum GameState {
    UPCOMING,
    ONGOING,
    FINISHED
}
enum BettingState {
    NOT_OPENED,
    OPEN,
    CLOSED,
    PAID
}
enum BettingType {
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
    POST_CONF
    POST_SB
}
`;

const mocks = {
    Query: () => ({
        currentRound: [...new Array(16)]
    }),

    Team: () => ({
        nickname: "Commanders",
        logo: "https://static.www.nfl.com/f_auto,q_85/league/api/clubs/logos/GB",
        shortName: "WAS",
        
    }),
    Game: () => ({
        id: () => faker.database.mongodbObjectId(),
        bets: () => [...new Array(6)],
        awayOdds: faker.datatype.float({min: 1.0, max: 7.0}),
        homeOdds: faker.datatype.float({min: 1.0, max: 7.0}),
    
    }),
    Bet: () => ({
        id: () => faker.database.mongodbObjectId(),
        player: "Thomas",
        score: 200,
        stake: () => faker.datatype.number({ min: 50, max: 900 }) 
        
    })
}

const server = new ApolloServer({
    typeDefs,
    mocks : mocks
})


server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });