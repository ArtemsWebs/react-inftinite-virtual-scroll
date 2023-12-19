const emojiDefaultLinkLinks = [
  'https://cdn3.emoji.gg/emojis/4496-brown-jump.gif',
  'https://cdn3.emoji.gg/emojis/7576-black-jump.gif',
  'https://cdn3.emoji.gg/emojis/3965-animegirljumping.gif',
  'https://cdn3.emoji.gg/emojis/5903-anyayay.gif',
];

export let mockChildren = (
  <>
    <img
      src="https://cdn3.emoji.gg/emojis/4496-brown-jump.gif"
      width="128px"
      height="128px"
      alt="brown_jump"
    />
    <img
      src="https://cdn3.emoji.gg/emojis/4496-brown-jump.gif"
      width="128px"
      height="128px"
      alt="brown_jump"
    />
    <img
      src="https://cdn3.emoji.gg/emojis/4496-brown-jump.gif"
      width="128px"
      height="128px"
      alt="brown_jump"
    />
    <img
      src="https://cdn3.emoji.gg/emojis/4496-brown-jump.gif"
      width="128px"
      height="128px"
      alt="brown_jump"
    />
    <img
      src="https://cdn3.emoji.gg/emojis/4496-brown-jump.gif"
      width="128px"
      height="128px"
      alt="brown_jump"
    />
    <img
      src="https://cdn3.emoji.gg/emojis/4496-brown-jump.gif"
      width="128px"
      height="128px"
      alt="brown_jump"
    />
    <img
      src="https://cdn3.emoji.gg/emojis/4496-brown-jump.gif"
      width="128px"
      height="128px"
      alt="brown_jump"
    />
    <img
      src="https://cdn3.emoji.gg/emojis/4496-brown-jump.gif"
      width="128px"
      height="128px"
      alt="brown_jump"
    />
    <img
      src="https://cdn3.emoji.gg/emojis/4496-brown-jump.gif"
      width="128px"
      height="128px"
      alt="brown_jump"
    />
    <img
      src="https://cdn3.emoji.gg/emojis/4496-brown-jump.gif"
      width="128px"
      height="128px"
      alt="brown_jump"
    />
    <img
      src="https://cdn3.emoji.gg/emojis/4496-brown-jump.gif"
      width="128px"
      height="128px"
      alt="brown_jump"
    />
  </>
);

export const mockRequestDataLink = new Array(10).fill(
  emojiDefaultLinkLinks[0],
  0,
  10
);

export const mockData = async (linkIndex: number): Promise<string[]> => {
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      const fetchLinkData: string[] = new Array(10).fill(
        emojiDefaultLinkLinks[linkIndex],
        0,
        10
      );
      resolve([...fetchLinkData]);
    }, 1000);
  });
};
