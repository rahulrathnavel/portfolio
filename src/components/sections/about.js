import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledAboutSection = styled.section`
  max-width: 900px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;

const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
    padding: 0;
    margin: 20px 0 0;
    list-style: none;

    li {
      display: flex;
      align-items: center;
      gap: 10px;
      min-height: 54px;
      padding: 9px 12px;
      border: 1px solid var(--lightest-navy);
      border-radius: var(--border-radius);
      background: var(--light-navy);
      box-shadow: 0 6px 14px -12px var(--navy-shadow);
      transition: var(--transition);
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        display: none;
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }

      &:hover,
      &:active {
        border-color: var(--green);
        transform: translateY(-3px);
        box-shadow: 0 12px 20px -16px var(--green);
      }

      &:active {
        transform: translateY(0);
      }

      .skill-icon {
        display: inline-flex;
        flex: 0 0 auto;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border-radius: 9px;
        color: var(--lightest-slate);
        background: var(--skill-color);
        box-shadow: inset 0 0 0 1px rgb(255 255 255 / 18%), 0 5px 12px -8px var(--skill-color);
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 0.02em;
      }

      .skill-name {
        line-height: 1.35;
      }
    }

    @media (max-width: 480px) {
      grid-template-columns: 1fr;
    }
  }
`;

const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: var(--green);

    &:hover,
    &:focus {
      outline: 0;
      transform: translate(-4px, -4px);

      &:after {
        transform: translate(8px, 8px);
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: var(--navy);
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--green);
      top: 14px;
      left: 14px;
      z-index: -1;
    }
  }
`;

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, [prefersReducedMotion]);

  const skills = [
    { name: 'Python', mark: 'Py', color: '#3776ab' },
    { name: 'PyTorch', mark: 'PT', color: '#ee4c2c' },
    { name: 'Hugging Face + Transformers', mark: 'HF', color: '#c99a06' },
    { name: 'LLM Engineering (RAG + LangGraph)', mark: 'AI', color: '#6656d8' },
    { name: 'FastAPI', mark: 'Fa', color: '#009688' },
    { name: 'Docker', mark: 'DK', color: '#2496ed' },
    { name: 'AWS + Terraform', mark: 'AW', color: '#ff9900' },
    { name: 'Git + Linux', mark: 'GL', color: '#f05032' },
  ];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              I am Rahul, an aspiring AI/ML software engineer who turns ideas into useful,
              reliable systems across LLMs, retrieval, and backend engineering.
            </p>

            <p>
              I build early, learn from what fails, and keep complex technology clear for the people
              using it. Here are the tools I work with:
            </p>
          </div>

          <ul className="skills-list">
            {skills.map(({ name, mark, color }) => (
              <li key={name} style={{ '--skill-color': color }}>
                <span className="skill-icon" aria-hidden="true">
                  {mark}
                </span>
                <span className="skill-name">{name}</span>
              </li>
            ))}
          </ul>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/me.jpg"
              width={500}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Rahul Rathnavel"
            />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
