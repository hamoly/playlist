const graphql = require('graphql');
const Album = require('../models/album');
const Artist = require('../models/Artist');

const {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLList,
	GraphQLSchema,
	GraphQLNonNull,
} = graphql;

const AlbumType = new GraphQLObjectType({
	name: 'Album',
	fields: () => ({
		id: {
			type: GraphQLID,
			descreption: '',
		},
		name: {
			type: GraphQLString,
			descreption: '',
		},
		releaseDate: {
			type: GraphQLString,
			description: '',
		},
		artistID: {
			type: GraphQLID,
		},
		artist: {
			type: ArtistType,
			description: '',
			resolve(parent, args) {
				return Artist.findById(parent.artistID);
			},
		},
	}),
});

const ArtistType = new GraphQLObjectType({
	name: 'artist',
	fields: () => ({
		id: {
			type: GraphQLID,
			description: '',
		},
		name: {
			type: GraphQLString,
			description: '',
		},
		albums: {
			type: new GraphQLList(AlbumType),
			description: '',
			resolve(parent, args) {
				return Album.find({ artistID: parent.id });
			},
		},
	}),
});

const RootQuery = new GraphQLObjectType({
	name: 'Query',
	fields: {
		album: {
			type: AlbumType,
			args: {
				id: { type: GraphQLID },
			},
			resolve(parent, args) {
				return Album.findById(args.id);
			},
		},
		artist: {
			type: ArtistType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return Artist.findById(args.id);
			},
		},
		albums: {
			type: new GraphQLList(AlbumType),
			resolve() {
				return Album.find({});
			},
		},
		artists: {
			type: new GraphQLList(ArtistType),
			resolve() {
				return Artist.find({});
			},
		},
	},
});

const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		addArtist: {
			type: ArtistType,
			args: { name: { type: new GraphQLNonNull(GraphQLString) } },
			resolve(parent, args) {
				let artist = new Artist({
					name: args.name,
				});
				return artist.save();
			},
		},
		addAlbum: {
			type: AlbumType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				releaseDate: { type: new GraphQLNonNull(GraphQLString) },
				artistID: { type: new GraphQLNonNull(GraphQLID) },
			},
			resolve(parent, args) {
				let album = new Album({
					name: args.name,
					releaseDate: args.releaseDate,
					artistID: args.artistID,
				});
				return album.save();
			},
		},
	},
});
module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation,
});
