import React, { FunctionComponent, useEffect } from 'react';
import { kebabCase } from 'lodash';
import { graphql } from 'gatsby';
import { FluidObject, FixedObject } from 'gatsby-image';
import { Formik, Field, Form } from 'formik';
import { useDispatch } from 'react-redux';
import { FaCaretRight } from 'react-icons/fa';
import styled from 'styled-components';

import {
  HeroImage,
  PageContainer,
  Box,
  Row,
  Column,
  Heading,
  HorizontalRule,
  FlexContainer,
  Pill,
  Seo,
  RelatedBlogPost,
  Share,
  Content,
  HTMLContent,
  Input,
  Button,
} from '../components';
import { requiredEmail, requiredField } from '../utils/validations';
import { addAlert } from '../redux/ducks/globalAlerts';
import postFormUrlEncoded from '../utils/postFormUrlEncoded';
import { brandTertiary } from '../styles/color';
import { fontFamilySerif } from '../styles/typography';
import { halfSpacer, quadrupleSpacer, quarterSpacer } from '../styles/size';

type RelatedPostType = {
  fields: {
    slug: string;
    readingTime: {
      text: string;
    };
  };
  frontmatter: {
    date: string;
    description: string;
    title: string;
    featuredimage: {
      childImageSharp: {
        fixed: FixedObject;
      };
    };
  };
};

type BlogPostProps = {
  pageContext?: {
    slug: string;
    next: RelatedPostType;
    prev: RelatedPostType;
  };
  content: any;
  contentComponent: any;
  date: string;
  tags: Array<string>;
  title: string;
  description: string;
  readingTime: {
    text: string;
  };
  featuredimage: {
    childImageSharp: {
      fluid: FluidObject;
      fixed: FixedObject;
    };
  };
  leadFormTitle: string;
  leadFormBody: string;
  leadFormCTAText: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
};

const BlogContent = styled.div`
  & > div > p:first-child:first-letter {
    color: ${brandTertiary};
    float: left;
    font-family: ${fontFamilySerif};
    font-size: 80px;
    line-height: ${quadrupleSpacer};
    padding-top: ${halfSpacer};
    padding-right: ${halfSpacer};
    padding-left: ${quarterSpacer};
  }
`;

export const BlogPostTemplate: FunctionComponent<BlogPostProps> = (props) => {
  const dispatch = useDispatch();

  const initialValues = {
    email: '',
    name: '',
    phone: '',
    subject: '',
  };

  const PostContent = props.contentComponent || Content;

  useEffect(() => {
    if (typeof window !== 'undefined' && window.instgrm) {
      window.instgrm.Embeds.process();
    }
  }, []);

  return (
    <div>
      <Seo
        title={props.metaTitle}
        description={props.metaDescription}
        meta={[{ name: 'keywords', content: props.metaKeywords }]}
        image={props.featuredimage.childImageSharp.fixed.src}
        imageWidth={props.featuredimage.childImageSharp.fixed.width}
        imageHeight={props.featuredimage.childImageSharp.fixed.height}
      />
      <HeroImage imgSrc={props.featuredimage} removeFromFlow />
      <PageContainer>
        <Row>
          <Column md={8} lg={9}>
            <Box largePadding height="auto" transparent>
              <div>
                <FlexContainer justifyContent="space-between">
                  <Heading>{props.title}</Heading>
                  {props.pageContext && (
                    <Share
                      url={props.pageContext.slug}
                      title={props.title}
                      tags={props.tags}
                      media={props.featuredimage.childImageSharp.fixed.src}
                      description={props.description}
                    />
                  )}
                </FlexContainer>
                <p>
                  <small>
                    {props.date} | {props.readingTime.text}
                  </small>
                </p>

                <HorizontalRule />
                {props.tags && props.tags.length ? (
                  <ul style={{ margin: '0 0 0 -4px', padding: 0 }}>
                    {props.tags.map((tag: string) => (
                      <Pill key={`${tag}tag`} to={`/tags/${kebabCase(tag)}/`} text={tag} />
                    ))}
                  </ul>
                ) : null}
                <HorizontalRule />
                <p style={{ fontStyle: 'italic' }}>{props.description}</p>
              </div>
            </Box>
            <Box largePadding height="auto" transparent>
              <BlogContent>
                <PostContent content={props.content} />
              </BlogContent>
            </Box>
            <Box largePadding height="auto">
              {props.pageContext && (
                <Share
                  url={props.pageContext.slug}
                  title={props.title}
                  tags={props.tags}
                  media={props.featuredimage.childImageSharp.fixed.src}
                  description={props.description}
                />
              )}
              <HorizontalRule />
              {props.tags && props.tags.length ? (
                <ul style={{ margin: '0 0 0 -4px', padding: 0 }}>
                  {props.tags.map((tag: string) => (
                    <Pill key={`${tag}tag`} to={`/tags/${kebabCase(tag)}/`} text={tag} />
                  ))}
                </ul>
              ) : null}
              <HorizontalRule />

              <Heading as="h3">Additional Reading</Heading>
              {props.pageContext && (
                <Row>
                  {props.pageContext.prev && (
                    <Column xs={6}>
                      <RelatedBlogPost post={props.pageContext.prev} type="prev" />
                    </Column>
                  )}
                  {props.pageContext.next && (
                    <Column xs={6}>
                      <RelatedBlogPost post={props.pageContext.next} type="next" />
                    </Column>
                  )}
                </Row>
              )}
            </Box>
          </Column>
          <Column md={4} lg={3}>
            <div>
              <Box transparent>
                <Heading as="h3">{props.leadFormTitle}</Heading>
                <p>{props.leadFormBody}</p>
                <Formik
                  validateOnMount
                  initialValues={initialValues}
                  onSubmit={(values, { resetForm, setSubmitting }) => {
                    const valuesWithSubject = {
                      ...values,
                      subject: `New lead form submission from ${values.name} ${values.email}`,
                    };
                    postFormUrlEncoded('blogPostLeadForm', valuesWithSubject)
                      .then(() => {
                        resetForm();
                        dispatch(
                          addAlert({
                            message: 'Thanks for your message. We will be in touch shortly!',
                            type: 'success',
                          })
                        );
                        if (window && window.analytics) {
                          window.analytics.track('Blog Post Lead Form completed', {
                            ...valuesWithSubject,
                            blogPost: props.title,
                          });
                        }
                      })
                      .catch(() => {
                        dispatch(
                          addAlert({
                            message: 'Something went wrong, please try again.',
                            type: 'danger',
                          })
                        );
                        if (window && window.analytics) {
                          window.analytics.track('Blog Post Lead Form failure', {
                            ...valuesWithSubject,
                            blogPost: props.title,
                          });
                        }
                      })
                      .finally(() => {
                        setSubmitting(false);
                      });
                  }}
                >
                  {({ values, isSubmitting, isValid, setFieldValue }) => (
                    <Form
                      name="blogPostLeadForm"
                      method="post"
                      netlify-honeypot="bot-field"
                      data-netlify="true"
                      onBlur={() =>
                        setFieldValue(
                          'subject',
                          `New blog post lead form submission from ${values.name} ${values.email}`
                        )
                      }
                    >
                      <input type="hidden" name="form-name" value="contact" />

                      <Field
                        as={Input}
                        type="text"
                        name="name"
                        label="Full Name"
                        validate={requiredField}
                        required
                      />

                      <Field as={Input} type="tel" name="phone" label="Phone Number" />

                      <Field
                        as={Input}
                        type="email"
                        name="email"
                        label="Email"
                        validate={requiredEmail}
                        required
                      />

                      <HorizontalRule />
                      <Button
                        type="submit"
                        block
                        iconRight={<FaCaretRight />}
                        disabled={isSubmitting || !isValid}
                        isLoading={isSubmitting}
                      >
                        {isSubmitting ? 'Submitting' : props.leadFormCTAText}
                      </Button>
                    </Form>
                  )}
                </Formik>
              </Box>
            </div>
          </Column>
        </Row>
      </PageContainer>
    </div>
  );
};

const BlogPost = ({ data, pageContext }: { data: any; pageContext: any }) => {
  const { markdownRemark: post } = data;

  return (
    <BlogPostTemplate
      metaTitle={post.frontmatter.metaTitle}
      metaDescription={post.frontmatter.metaDescription}
      metaKeywords={post.frontmatter.metaKeywords}
      content={post.html}
      contentComponent={HTMLContent}
      date={post.frontmatter.date}
      tags={post.frontmatter.tags}
      title={post.frontmatter.title}
      featuredimage={post.frontmatter.featuredimage}
      readingTime={post.fields.readingTime}
      description={post.frontmatter.description}
      pageContext={pageContext}
      leadFormTitle={post.frontmatter.leadFormTitle}
      leadFormBody={post.frontmatter.leadFormBody}
      leadFormCTAText={post.frontmatter.leadFormCTAText}
    />
  );
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      fields {
        readingTime {
          text
        }
      }
      frontmatter {
        metaTitle
        metaDescription
        metaKeywords
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
        leadFormTitle
        leadFormBody
        leadFormCTAText
        featuredimage {
          childImageSharp {
            fluid(maxWidth: 2400, quality: 60) {
              ...GatsbyImageSharpFluid
            }
            fixed(width: 1080, quality: 60) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
`;
