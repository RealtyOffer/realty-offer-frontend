import React, { FunctionComponent, useState } from 'react';
import { graphql } from 'gatsby';
import { FixedObject, FluidObject } from 'gatsby-image';
import ReactMarkdown from 'react-markdown/with-html';

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
  AccordionItemState,
} from 'react-accessible-accordion';
import { FaChevronCircleUp, FaChevronCircleDown, FaFilter } from 'react-icons/fa';

import {
  Box,
  Button,
  FlexContainer,
  HeroImage,
  Heading,
  PageContainer,
  Seo,
  Row,
  Column,
} from '../components';

import { doubleSpacer, baseSpacer, decupleSpacer } from '../styles/size';
import { brandPrimary, brandTertiary } from '../styles/color';

type FAQPageProps = {
  title: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  heroHeading: string;
  heroSubheading: string;
  heroImage: { childImageSharp: { fluid: FluidObject; fixed: FixedObject } };
  consumerFaq: {
    items: Array<{
      question: string;
      answer: any;
    }>;
  };
  agentFaq: {
    items: Array<{
      question: string;
      answer: any;
    }>;
  };
};

export const FAQPageTemplate: FunctionComponent<FAQPageProps> = ({
  heroImage,
  heroHeading,
  heroSubheading,
  consumerFaq,
  agentFaq,
  metaTitle,
  metaDescription,
  metaKeywords,
}) => {
  const [filter, setFilter] = useState<'all' | 'consumers' | 'agents'>('all');
  return (
    <div>
      <Seo
        title={metaTitle}
        description={metaDescription}
        meta={[{ name: 'keywords', content: metaKeywords }]}
        image={heroImage.childImageSharp.fixed.src}
        imageWidth={heroImage.childImageSharp.fixed.width}
        imageHeight={heroImage.childImageSharp.fixed.height}
      />
      <HeroImage imgSrc={heroImage} hasOverlay>
        <PageContainer>
          <Row>
            <Column md={7}>
              <Heading styledAs="title">{heroHeading}</Heading>
              <Heading as="h6">
                <ReactMarkdown source={heroSubheading} />
              </Heading>
            </Column>
          </Row>
        </PageContainer>
      </HeroImage>
      <section style={{ padding: `${decupleSpacer} 0` }}>
        <PageContainer>
          <p style={{ margin: `${doubleSpacer} 0` }}>
            <FaFilter /> <span style={{ marginRight: baseSpacer }}>Filter By:</span>
            <Button
              type="button"
              onClick={() => setFilter('all')}
              rightspacer
              color={filter === 'all' ? 'primary' : 'primaryOutline'}
            >
              All
            </Button>
            <Button
              type="button"
              onClick={() => setFilter('agents')}
              color={filter === 'agents' ? 'primary' : 'primaryOutline'}
              rightspacer
            >
              Agents
            </Button>
            <Button
              type="button"
              onClick={() => setFilter('consumers')}
              rightspacer
              color={filter === 'consumers' ? 'primary' : 'primaryOutline'}
            >
              Consumers
            </Button>
          </p>

          <Accordion allowZeroExpanded>
            {filter !== 'agents' &&
              consumerFaq.items.map((item) => (
                <AccordionItem key={item.question}>
                  <Box>
                    <AccordionItemHeading>
                      <AccordionItemButton>
                        <FlexContainer
                          justifyContent="space-between"
                          alignItems="center"
                          flexWrap="nowrap"
                        >
                          <Heading as="h4" noMargin>
                            {item.question}
                          </Heading>
                          <AccordionItemState>
                            {({ expanded }) =>
                              expanded ? (
                                <FaChevronCircleUp
                                  color={brandPrimary}
                                  size={doubleSpacer}
                                  style={{ flexShrink: 0 }}
                                />
                              ) : (
                                <FaChevronCircleDown
                                  color={brandTertiary}
                                  size={doubleSpacer}
                                  style={{ flexShrink: 0 }}
                                />
                              )
                            }
                          </AccordionItemState>
                        </FlexContainer>
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      <div style={{ paddingTop: baseSpacer }}>
                        <ReactMarkdown source={item.answer} />
                      </div>
                    </AccordionItemPanel>
                  </Box>
                </AccordionItem>
              ))}
          </Accordion>
          <Accordion allowZeroExpanded>
            {filter !== 'consumers' &&
              agentFaq.items.map((item) => (
                <AccordionItem key={item.question}>
                  <Box>
                    <AccordionItemHeading>
                      <AccordionItemButton>
                        <FlexContainer
                          justifyContent="space-between"
                          alignItems="center"
                          flexWrap="nowrap"
                        >
                          <Heading as="h4" noMargin>
                            {item.question}
                          </Heading>
                          <AccordionItemState>
                            {({ expanded }) =>
                              expanded ? (
                                <FaChevronCircleUp
                                  color={brandPrimary}
                                  size={doubleSpacer}
                                  style={{ flexShrink: 0 }}
                                />
                              ) : (
                                <FaChevronCircleDown
                                  color={brandTertiary}
                                  size={doubleSpacer}
                                  style={{ flexShrink: 0 }}
                                />
                              )
                            }
                          </AccordionItemState>
                        </FlexContainer>
                      </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                      <div style={{ paddingTop: baseSpacer }}>
                        <ReactMarkdown source={item.answer} />
                      </div>
                    </AccordionItemPanel>
                  </Box>
                </AccordionItem>
              ))}
          </Accordion>
          <FlexContainer justifyContent="center">
            <Button type="link" to="/">
              Back to Home
            </Button>
          </FlexContainer>
        </PageContainer>
      </section>
    </div>
  );
};

const FAQPage = ({ data }: { data: { markdownRemark: { frontmatter: FAQPageProps } } }) => {
  const { frontmatter } = data.markdownRemark;

  return <FAQPageTemplate {...frontmatter} />;
};

export default FAQPage;

export const pageQuery = graphql`
  query FAQPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "frequently-asked-questions" } }) {
      frontmatter {
        title
        metaTitle
        metaDescription
        metaKeywords
        heroImage {
          childImageSharp {
            fluid(maxWidth: 2400, quality: 60) {
              ...GatsbyImageSharpFluid
            }
            fixed(width: 1080, quality: 60) {
              ...GatsbyImageSharpFixed
            }
          }
        }
        heroHeading
        heroSubheading
        consumerFaq {
          items {
            question
            answer
          }
        }
        agentFaq {
          items {
            question
            answer
          }
        }
      }
    }
  }
`;
