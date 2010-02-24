/**
 * jQuery jPagination plugin v0.1 by Michael Ageev (2010-02-24)
 *
 * Copyright (c) 2010 Michael Ageev
 * http://michaelageev.com, http://twitter.com/michaelageev
 *
 * Built upon jQuery 1.3-1.4 (http://jquery.com)
 * Plugin is absolutely  free
 */

/* How to use:
 * Include plugin files jquery.jpagination.js and jpagination/style.css into your page
 * On document-ready execute next code:
 *
 *  $('#pagination-container').jPagination({
 *      itemsCount: 500     // Number of items for pagination
 *      ,pagesPerBlock: 15  // Number of pages for each block
 *      ,perPage: 5         // Number of items per each page
 *      ,callbackFn: function(){
 *          // Write your handler for click on a page event
 *      }
 *  });
 *
 *  Bingo!
 *
 */

$.fn.jPagination = function(options){

    return this.each(function() {

		var defaults = {
            itemsCount: 0           // number of items to paginate through
            ,perPage: 5             // records per page
            ,pagesPerBlock: 5       // pages per block
            ,pagesCount: 1          // number of pages
            ,blocksCount: 1         // private
            ,currentPage: 1         // private
            ,currentBlock: 1        // private

            /*
             * Initializes pagination control
             */
            ,init: function(container){

                this.container = container;

                $(this.container).addClass('jpagination');

                this.getItemsCount();
                this.renderControl();

            }

            /*
             * Calculates number of pages and blocks
             * depending of itemsCount, perPage and pagesPerBlock params
             */
            ,getItemsCount: function(){

                this.pagesCount = Math.ceil(this.itemsCount / this.perPage);
                this.blocksCount = Math.ceil(this.pagesCount / this.pagesPerBlock);

            }

            /*
             * Handles page-click event
             */
            ,onClickFn: function(button){
                
                $(button).siblings('a').removeClass('active');
                $(button).addClass('active');

                this.callbackFn($(button).attr('page'));

            }

            /**
             * Rewrite this method to create your own page-click callback
             */
            ,callbackFn: function(page){

                this.currentPage = page;
                
            }

            /*
             * Handles click on pagination control
             */
            ,switchBlock: function(page){

                if($(page).hasClass('next-block')){
                    this.currentBlock++;
                }else if($(page).hasClass('previous-block')){
                    this.currentBlock--;
                }else if($(page).hasClass('first-block')){
                    this.currentBlock=1;
                }else if($(page).hasClass('last-block')){
                    this.currentBlock=this.blocksCount;
                }

                this.renderControl();

            }

            /*
             * Pagination controls and pages events
             */
            ,bindPagerEvents: function(){
                
                $('a.page', this.container).bindWith('click', function(button){

                    this.onClickFn(button);
                    return false;

                }, this);

                $('a.block', this.container).bindWith('click', function(button){

                    this.switchBlock(button);
                    return false;

                }, this);
                
            }

            /*
             * Renders pagination pages
             */
            ,renderPager: function(){

                var from = (this.currentBlock-1)*this.pagesPerBlock;
                var to = this.currentBlock*this.pagesPerBlock;

                if(to > this.pagesCount) {

                    to = this.pagesCount;
                    from = this.pagesCount - this.pagesPerBlock;

                }
                
                $('.pager', this.container).empty();

                for(var i=from; i<to; i++){
                    var page = i+1;
                    $('.pager', this.container).append('<a href="#" class="page'+(page==this.currentPage?' active':'')+'" page="'+page+'">'+page+'</a>');

                }

            }

            /*
             * Renders pagination control buttons
             */
            ,renderControl: function(){

                if(this.pagesCount > 1){

                    $(this.container).html('<div class="prev"><a href="#" class="block first-block"></a><a href="#" class="block previous-block"></a></div><div class="pager"></div><div class="next"><a href="#" class="block next-block"></a><a href="#" class="block last-block"></a></div>');
                    
                    this.renderFirst();
                    this.renderPrevious();

                    this.renderPager();

                    this.renderNext();
                    this.renderLast();

                    this.bindPagerEvents();
                    
                }

            }

            /*
             * Toggles pagination-control buttons
             */
            ,renderButton: function(button, show){
                
                if(true===show){
                    $(button).show();
                }else{
                    $(button).hide();
                }

            }

            /*
             * Toggles next-button
             */
            ,renderNext: function(){

                this.renderButton($('.next .next-block', this.container), this.showNext());


            }

            /*
             * Toggles last-button
             */
            ,renderLast: function(){

                this.renderButton($('.next .last-block', this.container), this.showNext() && this.blocksCount - this.currentBlock > 1);

            }
            /*
             * Toggles previous-button
             */
            ,renderPrevious: function(){

                this.renderButton($('.prev .previous-block', this.container), this.showPrevious());

            }
            /*
             * Toggles first-button
             */
            ,renderFirst: function(){

                this.renderButton($('.prev .first-block', this.container), this.showPrevious() && this.currentBlock > 2 && this.blocksCount > 2);

            }

            /*
             * Calculates to show or to hide next-button
             */
            ,showNext: function(){

                if(!this.isLast() && this.currentBlock*this.pagesPerBlock <= this.pagesCount){
                    return true;
                }

                return false;

            }

            /*
             * Calculates to show or to hide previous-button
             */
            ,showPrevious: function(){

                if(!this.isFirst()){
                    return true;
                }

                return false;

            }

            /*
             * Calculates to show or to hide first-button
             */
            ,isFirst: function(){

                if(this.currentBlock == 1){
                    return true;
                }

                return false;
                
            }

            /*
             * Calculates to show or to hide last-button
             */
            ,isLast: function(){
                
                if(this.currentBlock == this.blocksCount){
                    return true;
                }
                
                return false;

            }

        };

		var obj = $.extend(defaults, options);

		obj.init(this);

	});
}