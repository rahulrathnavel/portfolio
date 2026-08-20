import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { Icon } from '@components/icons';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  height: 100vh;
  padding: 0;
  position: relative;
  isolation: isolate;
  overflow: hidden;
  background-color: var(--navy);

  &:before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    background-image: linear-gradient(
        90deg,
        rgba(10, 25, 47, 1) 0%,
        rgba(10, 25, 47, 0.97) 38%,
        rgba(10, 25, 47, 0.79) 58%,
        rgba(10, 25, 47, 0.64) 100%
      ),
      url('/leetcode-profile-view.png');
    background-position: center, right center;
    background-size: cover, min(72vw, 1080px) auto;
    background-repeat: no-repeat;
  }

  > * {
    position: relative;
    z-index: 1;
  }

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 5px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 560px;
  }

  .mode-links {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
    margin-top: 24px;
  }

  .mode-link {
    ${({ theme }) => theme.mixins.bigButton};
  }

  .leetcode-highlight {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    margin-top: 28px;
    padding: 10px 13px;
    border: 1px solid rgb(100 255 218 / 50%);
    border-radius: var(--border-radius);
    background: rgb(10 25 47 / 78%);
    color: var(--lightest-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xxs);
    line-height: 1.45;
    box-shadow: 0 12px 28px -20px var(--green);
    transition: var(--transition);

    svg {
      flex: 0 0 auto;
      width: 22px;
      height: 22px;
      color: #ffa116;
    }

    &:hover,
    &:focus-visible {
      border-color: var(--green);
      color: var(--green);
      transform: translateY(-3px);
    }

    .label {
      display: block;
      color: var(--green);
      font-size: 10px;
      letter-spacing: 0.08em;
    }

    .stats {
      display: block;
      margin-top: 1px;
    }

    .cta {
      display: block;
      margin-left: 4px;
      color: var(--green);
      white-space: nowrap;
    }
  }

  .leetcode-mobile-preview {
    display: none;
  }

  @media (max-width: 768px) {
    height: auto;
    min-height: 100vh;
    padding-top: var(--nav-height);

    &:before {
      display: none;
    }

    .leetcode-highlight {
      width: 100%;
      max-width: 420px;
      align-items: flex-start;
      padding: 11px;

      .cta {
        display: none;
      }
    }

    .leetcode-mobile-preview {
      display: block;
      width: 100%;
      max-width: 460px;
      margin-top: 18px;
      overflow: hidden;
      border: 1px solid rgb(100 255 218 / 42%);
      border-radius: var(--border-radius);
      box-shadow: 0 18px 34px -24px var(--green);

      img {
        display: block;
        width: 100%;
        filter: none !important;
        transition: var(--transition);
      }

      &:hover,
      &:focus-visible {
        border-color: var(--green);

        img {
          transform: scale(1.02);
        }
      }
    }
  }

  @media (max-width: 480px) {
    .leetcode-highlight {
      gap: 9px;
      font-size: 11px;
    }
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, [prefersReducedMotion]);

  const one = <h1>Hi, I am</h1>;
  const two = <h2 className="big-heading">Rahul Rathnavel.</h2>;
  const three = <h3 className="big-heading">I build useful AI/ML systems.</h3>;
  const four = (
    <div>
      <p>
        I am an aspiring AI/ML software engineer working across applied machine
        learning, retrieval, and product engineering. I like learning, building,
        and discussing LLMs — especially where they fail — while keeping the
        result understandable for the people who use it.
      </p>

      <a
        className="leetcode-highlight"
        href="https://www.leetcode.com/rahulrathnavel"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon name="LeetCode" />
        <span>
          <span className="label">LEETCODE / CONSISTENCY</span>
          <span className="stats">Knight · 853 solved · 360 active days</span>
        </span>
        <span className="cta">View profile ↗</span>
      </a>

      <a
        className="leetcode-mobile-preview"
        href="https://www.leetcode.com/rahulrathnavel"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="/leetcode-profile-view.png"
          alt="Rahul's LeetCode profile showing Knight level, 853 solved problems, and 360 active days"
        />
      </a>
    </div>
  );
  const five = (
    <div className="mode-links">
      <a
        className="mode-link"
        href="/os/"
        target="_blank"
        rel="noopener noreferrer"
      >
        View OS mode
      </a>
      <a
        className="mode-link"
        href="/game-tour/"
        target="_blank"
        rel="noopener noreferrer"
      >
        View game mode
      </a>
    </div>
  );

  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
