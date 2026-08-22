import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { socialMedia } from '@config';
import { Side } from '@components';
import { Icon } from '@components/icons';
import { usePrefersReducedMotion } from '@hooks';

const StyledSocialList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;

  &:after {
    content: '';
    display: block;
    width: 1px;
    height: 90px;
    margin: 0 auto;
    background-color: var(--light-slate);
  }

  li {
    position: relative;

    &:last-of-type {
      margin-bottom: 20px;
    }

    a {
      display: flex;
      position: relative;
      padding: 10px;

      &:hover,
      &:focus {
        transform: translateY(-3px);
      }

      svg {
        width: 20px;
        height: 20px;
      }

      &:hover .social-tooltip,
      &:focus-visible .social-tooltip {
        opacity: 1;
        transform: translate(0, -50%);
      }
    }
  }

  .social-tooltip {
    position: absolute;
    top: 50%;
    left: calc(100% + 12px);
    width: max-content;
    max-width: 210px;
    padding: 7px 9px;
    border: 1px solid rgb(100 255 218 / 36%);
    border-radius: var(--border-radius);
    background: rgb(10 25 47 / 96%);
    color: var(--lightest-slate);
    font-family: var(--font-mono);
    font-size: 10px;
    line-height: 1.45;
    pointer-events: none;
    opacity: 0;
    transform: translate(-8px, -50%);
    transition: opacity 180ms ease, transform 180ms ease;

    &.is-visible {
      animation: social-tooltip-cycle 2.8s ease both;
    }
  }

  @keyframes social-tooltip-cycle {
    0% {
      opacity: 0;
      transform: translate(-8px, -50%);
    }
    14%,
    79% {
      opacity: 1;
      transform: translate(0, -50%);
    }
    100% {
      opacity: 0;
      transform: translate(-8px, -50%);
    }
  }
`;

const prompts = {
  LeetCode: 'Knight level. 850+ solved — consistency is my favorite pattern.',
  GitHub: 'See the code, experiments, and lessons behind the work.',
  Linkedin: 'Let’s connect, exchange ideas, and keep learning.',
};

const Social = ({ isHome }) => {
  const [activeHint, setActiveHint] = useState(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!isHome || prefersReducedMotion) {
      return undefined;
    }

    const delays = socialMedia.map((_, index) =>
      window.setTimeout(() => setActiveHint(index), 1300 + index * 3200)
    );
    const clearHint = window.setTimeout(
      () => setActiveHint(null),
      1300 + socialMedia.length * 3200
    );

    return () => {
      delays.forEach(window.clearTimeout);
      window.clearTimeout(clearHint);
    };
  }, [isHome, prefersReducedMotion]);

  return (
    <Side isHome={isHome} orientation="left">
      <StyledSocialList>
        {socialMedia &&
          socialMedia.map(({ url, name }, i) => (
            <li key={name}>
              <a href={url} aria-label={name} target="_blank" rel="noreferrer">
                <Icon name={name} />
                <span
                  className={`social-tooltip${
                    activeHint === i ? ' is-visible' : ''
                  }`}
                  aria-hidden="true"
                >
                  {prompts[name]}
                </span>
              </a>
            </li>
          ))}
      </StyledSocialList>
    </Side>
  );
};

Social.propTypes = {
  isHome: PropTypes.bool,
};

export default Social;
