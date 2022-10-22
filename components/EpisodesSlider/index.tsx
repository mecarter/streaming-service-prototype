import React, { FC, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { chakra, Stack, Box, Button } from '@chakra-ui/react'

import { EpisodeType } from '../../config/types'

// ICONS
import IconArrowRight from '../../public/icon--arrow-right.svg'
import IconArrowLeft from '../../public/icon--arrow-left.svg'

const EPISODE_CARD_WIDTH = 201

type EpisodesSliderProps = {
  activeEpisode: string
  episodes: EpisodeType[]
  isDrawerOpen: boolean
  onClickEpisode: (episodeNumber: string) => void
}

const EpisodesSlider: FC<EpisodesSliderProps> = ({
  activeEpisode,
  episodes,
  isDrawerOpen,
  onClickEpisode,
}) => {
  const [canSlide, setCanSlide] = useState<boolean>(false)
  const [offset, setOffset] = useState<number>(0)
  const [maxOffset, setMaxOffset] = useState<number>(0)
  const SliderWrapperRef = useRef<HTMLDivElement | undefined>()
  const SliderRef = useRef<HTMLDivElement | undefined>()
  const numEpisodes: number = episodes.length

  const canSlideLeft = offset > 0
  const canSlideRight = offset < maxOffset

  useEffect(() => {
    if (!SliderRef.current || !SliderWrapperRef.current) return

    const calculateSlider = () => {
      const windowWidth = window.innerWidth

      // If less than the 2nd breakpoint, reset and don't initialize the slider
      if (windowWidth < 768) {
        return
      }

      const _sliderWrapperWidth =
        SliderWrapperRef.current.getBoundingClientRect().width -
        windowWidth * 0.0666
      const _sliderWidth = SliderRef.current.getBoundingClientRect().width

      if (_sliderWidth > _sliderWrapperWidth - EPISODE_CARD_WIDTH) {
        const _maxOffset = Math.ceil(
          (_sliderWidth - _sliderWrapperWidth) / EPISODE_CARD_WIDTH,
        )
        setCanSlide(true)
        setOffset(0)
        setMaxOffset(_maxOffset)
      } else {
        setCanSlide(false)
        setOffset(0)
        setMaxOffset(0)
      }
    }

    calculateSlider()

    window.addEventListener('resize', calculateSlider)

    return () => {
      window.removeEventListener('resize', calculateSlider)
    }
  }, [SliderWrapperRef, SliderRef])

  return (
    <Box
      bottom="calc(8.4vh - 48px)"
      overflow="hidden"
      paddingLeft="6.66vw"
      paddingRight={['6.66vw', '6.66vw', '0']}
      paddingBottom="48px"
      // Extra space for the scale(1.1) Card hover effect
      paddingTop="12px"
      position={['static', 'static', 'absolute']}
      ref={SliderWrapperRef}
      width="100vw"
    >
      <Stack
        alignItems="flex-start"
        direction={['column', 'column', 'row']}
        flexWrap="nowrap"
        ref={SliderRef}
        spacing="7"
        transform={`translateX(calc(-${EPISODE_CARD_WIDTH * offset}px - ${
          28 * offset
        }px)) translateZ(0)`}
        transition="transform 0.6s cubic-bezier(0.65, 0.05, 0.36, 1)" // Quadratic ease in-out
        // width of all episode cards + margins
        width={['auto', 'auto', `${numEpisodes * 229 - 28}px`]}
      >
        {episodes.map(({ description, episode, imageSrc, title }) => (
          <Box
            as="button"
            flex={`0 0 ${EPISODE_CARD_WIDTH}px`}
            key={episode}
            onClick={() => onClickEpisode(episode)}
            position="relative"
            textAlign="left"
            transition="transform 0.3s"
            _hover={{
              lg: {
                transform: 'scale(1.1)',
              },
            }}
          >
            <Box
              background="black"
              sx={{ '> span': { verticalAlign: 'bottom' } }}
            >
              <Image
                alt={`Preview image for ${title}`}
                src={imageSrc}
                layout="intrinsic"
                style={{
                  verticalAlign: 'bottom',
                  opacity:
                    isDrawerOpen && episode !== activeEpisode ? '0.4' : '1',
                  transition: 'opacity 0.3s ease-out',
                }}
              />
            </Box>
            <chakra.span
              background="white"
              color="black"
              height="30px"
              left="0"
              lineHeight="30px"
              position="absolute"
              textAlign="center"
              top="0"
              width="30px"
              fontWeight="bold"
              fontSize="md"
            >
              {episode}
            </chakra.span>
            <chakra.h4
              marginBottom="3.5"
              marginTop="5"
              maxWidth={`${EPISODE_CARD_WIDTH}px`}
              overflow="hidden"
              textOverflow="ellipsis"
              title={title}
              whiteSpace="nowrap"
            >
              {title}
            </chakra.h4>
            <chakra.p fontSize="sm">{description}</chakra.p>
          </Box>
        ))}
      </Stack>
      {canSlide && (
        <Box position="absolute" bottom="0" right="6.66vw">
          <Button
            variant="ghost"
            width="30px"
            height="30px"
            lineHeight="30px"
            cursor={canSlideLeft ? 'point' : 'default'}
            onClick={() =>
              canSlide && canSlideLeft ? setOffset(offset - 1) : null
            }
            opacity={canSlideLeft ? '1' : '0.48'}
            _hover={{
              background: 'none',
              transform: canSlideLeft ? 'scale(1.1)' : '',
            }}
            _active={{
              background: 'none',
              transform: canSlideLeft ? 'scale(1.1)' : '',
            }}
          >
            <chakra.img
              alt="Icon: arrow pointing left"
              {...IconArrowLeft}
              maxWidth="none"
            />
          </Button>
          <Button
            variant="ghost"
            width="30px"
            height="30px"
            lineHeight="30px"
            cursor={canSlideRight ? 'point' : 'default'}
            onClick={() =>
              canSlide && canSlideRight ? setOffset(offset + 1) : null
            }
            opacity={canSlideRight ? '1' : '0.48'}
            _hover={{
              background: 'none',
              transform: canSlideRight ? 'scale(1.1)' : '',
            }}
            _active={{
              background: 'none',
              transform: canSlideRight ? 'scale(1.1)' : '',
            }}
          >
            <chakra.img
              alt="Icon: arrow pointing right"
              {...IconArrowRight}
              maxWidth="none"
            />
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default EpisodesSlider
