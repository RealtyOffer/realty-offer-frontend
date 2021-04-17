import React, { FunctionComponent } from 'react';
import { Link, graphql } from 'gatsby';
import { FluidObject } from 'gatsby-image';
import ReactMarkdown from 'react-markdown/with-html';
import styled from 'styled-components';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
  AccordionItemState,
} from 'react-accessible-accordion';
import { FaChevronCircleUp, FaChevronCircleDown } from 'react-icons/fa';

import {
  Box,
  Button,
  FlexContainer,
  HeroImage,
  Heading,
  PageContainer,
  Seo,
  HorizontalRule,
} from '../components';

import { doubleSpacer, baseSpacer, breakpoints } from '../styles/size';
import { lightestGray } from '../styles/color';

type FAQPageProps = {
  title: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  heroHeading: string;
  heroSubheading: string;
  heroImage: { childImageSharp: { fluid: FluidObject } };
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

const HeroBox = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  padding: ${baseSpacer};
  max-width: ${breakpoints.md};
  @media only screen and (min-width: ${breakpoints.sm}) {
    padding: ${doubleSpacer};
  }
`;

export const FAQPageTemplate: FunctionComponent<FAQPageProps> = ({
  heroImage,
  heroHeading,
  heroSubheading,
  consumerFaq,
  agentFaq,
  metaTitle,
  metaDescription,
  metaKeywords,
}) => (
  <div>
    <Seo
      title={metaTitle}
      description={metaDescription}
      meta={[{ name: 'keywords', content: metaKeywords }]}
    />
    <HeroImage imgSrc={heroImage}>
      <HeroBox>
        <Heading inverse>{heroHeading}</Heading>
        <Heading inverse as="h2">
          {heroSubheading}
        </Heading>
      </HeroBox>
    </HeroImage>
    <section style={{ padding: `${doubleSpacer} 0` }}>
      <PageContainer>
        <Box>
          <p>
            <Link to="/">Home</Link> &gt; FAQs
          </p>
          <Heading styledAs="title">Frequently Asked Questions (FAQs)</Heading>
          <br />
          <Heading as="h2" styledAs="subtitle">
            Consumers looking to buy or sell FAQs
          </Heading>
          <HorizontalRule />
          <Accordion allowZeroExpanded>
            {consumerFaq.items.map((item) => (
              <AccordionItem key={item.question}>
                <AccordionItemHeading>
                  <AccordionItemButton>
                    <FlexContainer justifyContent="space-between" alignItems="center">
                      <Heading as="h6" noMargin>
                        {item.question}
                      </Heading>
                      <AccordionItemState>
                        {({ expanded }) =>
                          expanded ? (
                            <FaChevronCircleUp color={lightestGray} size={doubleSpacer} />
                          ) : (
                            <FaChevronCircleDown color={lightestGray} size={doubleSpacer} />
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
                <HorizontalRule />
              </AccordionItem>
            ))}
          </Accordion>
          <br />
          <Heading as="h2" styledAs="subtitle">
            Agent FAQs
          </Heading>
          <HorizontalRule />
          <Accordion allowZeroExpanded>
            {agentFaq.items.map((item) => (
              <AccordionItem key={item.question}>
                <AccordionItemHeading>
                  <AccordionItemButton>
                    <FlexContainer justifyContent="space-between" alignItems="center">
                      <Heading as="h6" noMargin>
                        {item.question}
                      </Heading>
                      <AccordionItemState>
                        {({ expanded }) =>
                          expanded ? (
                            <FaChevronCircleUp color={lightestGray} size={doubleSpacer} />
                          ) : (
                            <FaChevronCircleDown color={lightestGray} size={doubleSpacer} />
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
                <HorizontalRule />
              </AccordionItem>
            ))}
          </Accordion>
          <FlexContainer justifyContent="center">
            <Button type="link" to="/">
              Back to Home
            </Button>
          </FlexContainer>
        </Box>
      </PageContainer>
    </section>
  </div>
);

const FAQPage = ({ data }: { data: { markdownRemark: { frontmatter: FAQPageProps } } }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <FAQPageTemplate
      metaTitle={frontmatter.metaTitle}
      metaDescription={frontmatter.metaDescription}
      metaKeywords={frontmatter.metaKeywords}
      heroImage={frontmatter.heroImage}
      title={frontmatter.title}
      heroHeading={frontmatter.heroHeading}
      heroSubheading={frontmatter.heroSubheading}
      consumerFaq={frontmatter.consumerFaq}
      agentFaq={frontmatter.agentFaq}
    />
  );
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
            fluid(maxWidth: 2048, quality: 60) {
              ...GatsbyImageSharpFluid
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
