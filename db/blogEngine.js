var mongoose = require('mongoose');
var schema = new mongoose.Schema({ order: Number, title: String, body: String, published: Date})
var BlogPost = mongoose.model('BlogPost', schema)

exports.createBlogEntry = function(post, cbk) {
	BlogPost.find({}, function(err, entries) {
		console.log(entries)
		var entry = new BlogPost( {order: entries.length+1, title: post.title, body: post.body, published: Date.now()});
		entry.save()
		return cbk()
	});
}

exports.getBlogEntries = function(cbk) {
    BlogPost.find({}, function(err, entries) {
		return cbk(entries)
	});;
}
 
exports.getBlogEntry = function(order, cbk) {
    BlogPost.find({order: order}, function(err, entries) {
    	return cbk(entries[0])
    })
}