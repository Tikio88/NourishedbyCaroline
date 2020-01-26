import React, { useEffect } from "react";
import { connect, styled } from "frontity";
import Link from "./link";
import List from "./list";
import FeaturedMedia from "./featured-media";

const Post = ({ state, actions, libraries }) => {
  // Get information about the current URL.
  const data = state.source.get(state.router.link);
  // Get the data of the post.
  const post = state.source[data.type][data.id];
  // Get the data of the author.
  const author = state.source.author[post.author];
  // Get a human readable date.
  const date = new Date(post.date);

  // Get the html2react component.
  const Html2React = libraries.html2react.Component;

  // Once the post has loaded in the DOM, prefetch both the
  // home posts and the list component so if the user visits
  // the home page, everything is ready and it loads instantly.
  useEffect(() => {
    actions.source.fetch("/");
    List.preload();
  }, []);

  // Load the post, but only if the data is ready.
  return data.isReady ? (
    <Container>
      <div>
        <Title dangerouslySetInnerHTML={{ __html: post.title.rendered }} />

        {/* Only display author and date on posts */}
        {data.isPost && (
          <div>
            {author && (
              <StyledLink link={author.link}>
                <Author>
                  By <b>{author.name}</b>
                </Author>
              </StyledLink>
            )}
            <Fecha>
              {" "}
              on <b>{date.toDateString()}</b>
            </Fecha>
          </div>
        )}
      </div>

      {/* Look at the settings to see if we should include the featured image */}
      {state.theme.featured.showOnPost && (
        <FeaturedMedia id={post.featured_media} />
      )}

      {/* Render the content using the Html2React component so the HTML is processed
       by the processors we included in the libraries.html2react.processors array. */}
      <Content>
        <Html2React html={post.content.rendered} />
      </Content>
    </Container>
  ) : null;
};

export default connect(Post);

const Container = styled.div`
  width: 800px;
  margin: 0;
  padding: 24px;
`;

const Title = styled.h1`
  margin: 0;
  margin-top: 24px;
  margin-bottom: 8px;
  color: rgba(12, 17, 43);
`;

const StyledLink = styled(Link)`
  padding: 15px 0;
`;

const Author = styled.p`
  color: rgba(12, 17, 43, 0.9);
  font-size: 0.9em;
  display: inline;
`;

const Fecha = styled.p`
  color: rgba(12, 17, 43, 0.9);
  font-size: 0.9em;
  display: inline;
`;

// This component is the parent of the `content.rendered` HTML. We can use nested
// selectors to style that HTML.
const Content = styled.div`
  color: rgba(12, 17, 43, 0.8);
  word-break: break-word;

  * {
    max-width: 100%;
  }

  p {
    line-height: 1.6em;
  }

  img {
    width: 100%;
    object-fit: cover;
    object-position: center;
  }

  figure {
    margin: 24px auto;
    /* next line overrides an inline style of the figure element. */
    width: 100% !important;

    figcaption {
      font-size: 0.7em;
    }
  }

  iframe {
    display: block;
    margin: auto;
  }

  blockquote {
    margin: 16px 0;
    background-color: rgba(0, 0, 0, 0.1);
    border-left: 4px solid rgba(12, 17, 43);
    padding: 4px 16px;
  }

  a {
    color: rgb(31, 56, 197);
    text-decoration: underline;
  }

  /* WordPress Core Align Classes */

  @media (min-width: 420px) {
    img.aligncenter,
    img.alignleft,
    img.alignright {
      width: auto;
    }

    .aligncenter {
      display: block;
      margin-left: auto;
      margin-right: auto;
    }

    .alignright {
      float: right;
      margin-left: 24px;
    }

    .alignleft {
      float: left;
      margin-right: 24px;
    }
  }
  .comment-form-wprm-rating .wprm-rating-star{cursor:pointer}img.wprm-comment-rating{display:block;margin:5px 0}img.wprm-comment-rating+br{display:none}.wprm-rating-star svg{display:inline;vertical-align:middle;width:16px;height:16px;margin:0}.wprm-rating-star.rated svg polygon{fill:black}
  .wprm-print .wprm-recipe{max-width:750px;margin:0 auto}.wprm-print .wprm-recipe-print,.wprm-print .wprm-recipe-jump,.wprm-print .wprm-recipe-jump-video,.wprm-print .wprm-recipe-pin,.wprm-print .wprm-unit-conversion-container,.wprm-print .wprm-recipe-video-container{display:none !important}
  .wprm-automatic-recipe-snippets{margin-bottom:10px}.wprm-automatic-recipe-snippets.align-center{text-align:center}.wprm-automatic-recipe-snippets.align-right{text-align:right}.wprm-automatic-recipe-snippets .wprm-jump-to-recipe-shortcode,.wprm-automatic-recipe-snippets .wprm-jump-to-video-shortcode,.wprm-automatic-recipe-snippets .wprm-print-recipe-shortcode{display:inline-block;margin:0 5px;padding:5px 10px;text-decoration:none}
  .wprm-recipe{overflow:auto;zoom:1;text-align:left;clear:both}.wprm-recipe *{box-sizing:border-box}.wprm-recipe ol,.wprm-recipe ul{-webkit-margin-before:0;-webkit-margin-after:0;-webkit-padding-start:0;margin:0;padding:0}.wprm-recipe li{font-size:1em;margin:0 0 0 32px;padding:0}.wprm-recipe p{font-size:1em;margin:0;padding:0}.wprm-recipe li,.wprm-recipe li.wprm-recipe-instruction{list-style-position:outside}.wprm-recipe li:before{display:none}.wprm-recipe h1,.wprm-recipe h2,.wprm-recipe h3,.wprm-recipe h4,.wprm-recipe h5,.wprm-recipe h6{clear:none;font-variant:normal;text-transform:none;letter-spacing:normal;margin:0;padding:0}.wprm-recipe a.wprm-recipe-link,.wprm-recipe a.wprm-recipe-link:hover{-webkit-box-shadow:none;-moz-box-shadow:none;box-shadow:none}.wprm-recipe .wprm-nutrition-label{margin-top:10px}body:not(.wprm-print) .wprm-recipe p:first-letter{font-size:inherit;line-height:inherit;color:inherit;margin:inherit;padding:inherit;font-family:inherit}.rtl .wprm-recipe{text-align:right}.rtl .wprm-recipe li{margin:0 32px 0 0}
  .wprm-spacer{display:block !important;background:none !important;font-size:0;line-height:0;width:100%;height:10px}.wprm-spacer+.wprm-spacer{display:none !important}.wprm-recipe-summary .wprm-spacer,.wprm-recipe-instruction-text .wprm-spacer,.wprm-recipe-notes .wprm-spacer{display:block !important}
  .wprm-call-to-action.wprm-call-to-action-simple{margin-top:10px;padding:5px 10px;display:flex;justify-content:center;align-items:middle}.wprm-call-to-action.wprm-call-to-action-simple .wprm-call-to-action-icon{font-size:2.2em;margin:5px 0.5em 5px 0}.wprm-call-to-action.wprm-call-to-action-simple .wprm-call-to-action-icon svg{margin-top:0}.wprm-call-to-action.wprm-call-to-action-simple .wprm-call-to-action-text-container{margin:5px 0}.wprm-call-to-action.wprm-call-to-action-simple .wprm-call-to-action-text-container .wprm-call-to-action-header{display:block;font-weight:bold;font-size:1.3em}@media all and (max-width: 450px){.wprm-call-to-action.wprm-call-to-action-simple{flex-wrap:wrap}.wprm-call-to-action.wprm-call-to-action-simple .wprm-call-to-action-text-container{text-align:center}}.wprm-recipe-block-container-inline{display:inline-block;margin-right:1.2em}.rtl .wprm-recipe-block-container-inline{margin-right:0;margin-left:1.2em}.wprm-recipe-block-container-separate{display:block}.wprm-recipe-block-container-separated{display:block}.wprm-recipe-block-container-separated .wprm-recipe-details-label{display:block}.wprm-recipe-block-container-columns{display:block}.wprm-recipe-block-container-columns .wprm-recipe-details-label{display:inline-block;min-width:130px}.wprm-recipe-details-container-inline{display:inline}.wprm-recipe-details-container-table{display:flex;align-items:center;border:1px dotted #666;border-left:none !important;border-right:none !important;padding:5px;margin:5px 0}.wprm-recipe-details-container-table .wprm-recipe-block-container-table{flex:1;display:flex;flex-direction:column;text-align:center}@media all and (min-width: 451px){.wprm-recipe-block-container-table{border-top:none !important;border-bottom:none !important;border-right:none !important}.wprm-recipe-block-container-table:first-child{border-left:none !important}.rtl .wprm-recipe-block-container-table{border-left:none !important}.rtl .wprm-recipe-block-container-table:first-child{border-right:none !important}}@media all and (max-width: 450px){.wprm-recipe-details-container-table{display:block;border:none;padding:0;margin:5px 0}.wprm-recipe-details-container-table .wprm-recipe-block-container-table{padding:5px}.wprm-recipe-block-container-table{border-bottom:none !important;border-left:none !important;border-right:none !important}.wprm-recipe-block-container-table:first-child{border-top:none !important}.wprm-recipe-block-container-columns .wprm-recipe-details-label{min-width:0;margin-right:0.4em}}.wprm-recipe-details-unit{font-size:0.8em}.wprm-container-float-left{float:left;margin:0 10px 10px 0;text-align:center;position:relative;z-index:1}.rtl .wprm-container-float-left{float:right;margin:0 0 10px 10px}.wprm-container-float-right{float:right;margin:0 0 10px 10px;text-align:center;position:relative;z-index:1}.rtl .wprm-container-float-right{float:left;margin:0 10px 10px 0}@media only screen and (max-width: 640px){.wprm-container-float-left,.wprm-container-float-right,.rtl .wprm-container-float-left,.rtl .wprm-container-float-right{float:none}}.wprm-block-text-normal{font-weight:400;font-style:normal;text-transform:none}.wprm-block-text-light{font-weight:300 !important}.wprm-block-text-bold{font-weight:bold !important}.wprm-block-text-italic{font-style:italic !important}.wprm-block-text-uppercase{text-transform:uppercase !important}.wprm-block-text-faded{opacity:0.6}.wprm-block-text-uppercase-faded{text-transform:uppercase !important;opacity:0.6}.wprm-align-left{text-align:left}.wprm-align-center{text-align:center}.wprm-align-right{text-align:right}.wprm-recipe-icon svg{display:inline;vertical-align:middle;margin-top:-0.15em;width:1.3em;height:1.3em;overflow:visible}.wprm-recipe-image img{display:block;margin:0 auto}.wprm-recipe-image .dpsp-pin-it-wrapper{margin:0 auto}.wprm-block-image-circle img{border-radius:50%}.wprm-recipe-ingredients-container .wprm-recipe-ingredient-group-name{margin-top:0.8em !important}.wprm-recipe-ingredients-container .wprm-recipe-ingredient-notes-faded{opacity:0.7}.wprm-recipe-ingredients-container .wprm-recipe-ingredient-notes-smaller{font-size:0.8em}.wprm-recipe-ingredients-container .wprm-recipe-ingredient-notes-smaller-faded{opacity:0.7;font-size:0.8em}.wprm-recipe-instructions-container .wprm-recipe-instruction-group-name{margin-top:0.8em !important}.wprm-recipe-instructions-container .wprm-recipe-instruction-text{font-size:1em}.wprm-recipe-instructions-container .wprm-recipe-instruction-image{margin:5px 0 15px}.wprm-recipe-link{cursor:pointer;text-decoration:none}.wprm-recipe-link.wprm-recipe-link-inline-button{display:inline-block;margin:0 5px 5px 0}.wprm-recipe-link.wprm-recipe-link-button{display:table;margin:5px auto}.wprm-recipe-link.wprm-recipe-link-wide-button{display:block;width:100%;margin:5px 0;text-align:center}.wprm-recipe-link.wprm-recipe-link-button,.wprm-recipe-link.wprm-recipe-link-inline-button,.wprm-recipe-link.wprm-recipe-link-wide-button{border-width:1px;border-style:solid;padding:5px}.rtl .wprm-recipe-link.wprm-recipe-link-inline-button{margin:0 0 5px 5px}.wprm-nutrition-label-container-simple .wprm-nutrition-label-text-nutrition-unit{font-size:0.85em}.wprm-recipe-rating{white-space:nowrap}.wprm-recipe-rating svg{vertical-align:middle;margin-top:-0.15em !important;width:1.1em;height:1.1em;margin:0}.wprm-recipe-rating .wprm-recipe-rating-details{font-size:0.8em}.wprm-spacer{display:block !important;background:none !important;font-size:0;line-height:0;width:100%;height:10px}.wprm-spacer+.wprm-spacer{display:none !important}.wprm-recipe-summary .wprm-spacer,.wprm-recipe-instruction-text .wprm-spacer,.wprm-recipe-notes .wprm-spacer{display:block !important}.wprm-recipe-header+.wprm-recipe-video{margin-top:10px}
  
  .wprm-recipe-template-classic {
    border-top-style: solid; /* wprm_border_style type=border */
    border-top-width: 1px; /* wprm_border_top_width type=size */
    border-top-color: #aaaaaa; /* wprm_border_top type=color */
    padding: 10px;
  }
  `