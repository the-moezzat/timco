import {
  GithubLogo,
  InstagramLogo,
  LinkedinLogo,
  SpotifyLogo,
  TwitterLogo,
  YoutubeLogo,
} from '@phosphor-icons/react';
import { Separator } from '@radix-ui/react-separator';

export default function Footer() {
  return (
    <div className="mt-auto pb-1">
      <Separator
        orientation="horizontal"
        className="mb-2 bg-neutral-300 h-[0.5px] mt-2"
      />
      <div className="flex justify-center gap-1 items-center mt-auto">
        {/* <p className="text-sm text-neutral-500 max-sm:text-xs">
          @{new Date().getFullYear()} all right received tim co
        </p> */}
        <div className="flex gap-1 text-3xl text-neutral-700">
          <a href="https://github.com/tcco/">
            {''}
            <GithubLogo weight="fill" />
          </a>
          <a href="https://www.linkedin.com/in/cotim/">
            {''}
            <LinkedinLogo weight="fill" />
          </a>
          <a href="https://open.spotify.com/user/codreams92">
            {''}
            <SpotifyLogo weight="fill" />
          </a>
          <a href="https://twitter.com/gotimco">
            {''}
            <TwitterLogo weight="fill" />
          </a>
          <a href="https://www.strava.com/athletes/17956277">
            {''}
            <img
              src="/strava.svg"
              alt="strave logo"
              className="w-7 fill-neutral-700"
            />
          </a>
          <a href="https://www.instagram.com/timchi.co/">
            {''}
            <InstagramLogo weight="fill" />
          </a>
          <a href="https://www.youtube.com/channel/UC4C4EmizCEX1Ua_cvbtPvTg">
            {''}
            <YoutubeLogo weight="fill" />
          </a>
        </div>
      </div>
    </div>
  );
}
