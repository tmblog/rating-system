	function like_comment(event){
		event.preventDefault();
		var has_id = jQuery(this).parent().children('input');
		var id = has_id.val();
		like_ajax_comment(id);
	}
	
	function like_ajax_comment(id){
		jQuery.ajax({
			type: "post",
			url: vortex_ajax_comment.url,
			dataType: "json",
			data:{
				action:'vortex_system_comment_like_button',
				post_id:id,
				nonce: vortex_ajax_comment.nonce
			},
			success: function(response){
				if(response.both == 'no'){
				var like = jQuery('.vortex-p-like-counter-comment.'+id);
				like.text(response.likes);
				var like_toggle = jQuery('.vortex-p-like-comment.'+id);
				like_toggle.toggleClass('vortex-p-like-active-comment');
				}else{
					
				var dislike = jQuery('.vortex-p-dislike-counter-comment.'+id);
				dislike.text(response.dislikes);
				
				var dislike_toggle = jQuery('.vortex-p-dislike-comment.'+id);
				dislike_toggle.toggleClass('vortex-p-dislike-active-comment');
				
				var like = jQuery('.vortex-p-like-counter-comment.'+id);
				like.text(response.likes);
				
				var like_toggle = jQuery('.vortex-p-like-comment.'+id);
				like_toggle.toggleClass('vortex-p-like-active-comment');
				
				}
			},
			complete:function(){
				jQuery('body').one('click.vortexlikecomment','.vortex-p-like-comment',like_comment);
			}
		});
	}

jQuery(document).ready(function() {
	jQuery('body').off('click.vortexlikecomment','.vortex-p-like-comment').one('click.vortexlikecomment','.vortex-p-like-comment',like_comment);
});