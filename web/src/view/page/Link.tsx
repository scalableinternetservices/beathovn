import * as React from 'react';

export function Link( props: {musicLink: string, musicLinkImg: string, musicLinkSite: string, musicLinkTitle: string}) {
  return (
    <ReadmeImg width="256" height="64">
      <style>
        {`
            .paused {
              animation-play-state: paused !important;
              background: #e1e4e8 !important;
            }

            a, u {
                text-decoration: none;
            }

            img:not([src]) {
              content: url("data:image/gif;base64,R0lGODlhAQABAPAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==");
              border-radius: 6px;
              background: #FFF;
              border: 1px solid #e1e4e8;
            }

            p {
              display: block;
              opacity: 0;
            }

            #track,
            #musicSite,
            #cover {
              opacity: 0;
              animation: appear 300ms ease-out forwards;
            }

            #track {
              animation-delay: 400ms;
            }

            #musicSite {
              animation-delay: 500ms;
            }

            #cover {
              animation-name: cover-appear;
              animation-delay: 300ms;
              box-shadow: 0 1px 3px rgba(0,0,0,0.1), 0 3px 10px rgba(0,0,0,0.05);
            }

            #cover:not([src]) {
              box-shadow: none;
            }

            @keyframes cover-appear {
              from {
                opacity: 0;
                transform: scale(0.8);
              }
              to {
                opacity: 1;
                transform: scale(1);
              }
            }

            @keyframes appear {
              from {
                opacity: 0;
                transform: translateX(-8px);
              }
              to {
                opacity: 1;
                transform: translateX(0);
              }
            }
        `}
      </style>
      <a href={props.musicLink} target="_blank">
        <div
            style={{
            display: "flex",
            alignItems: "center",
            paddingTop: 8,
            paddingBottom: 8,
            paddingLeft: 4
            }}
        >
            <img id="cover" src={props.musicLinkImg ?? null} width="48" height="48" />
            <div
            style={{
                display: "flex",
                flex: 1,
                flexDirection: "column",
                marginTop: -4,
                marginLeft: 8
            }}
            >
            <Text id="track" weight="bold">
                {props.musicLinkTitle || props.musicLink}
            </Text>
            <Text id="musicSite" color={!props.musicLinkSite ? "gray" : undefined}>
                {props.musicLinkSite || "interwebs"}
            </Text>
            </div>
        </div>
      </a>
    </ReadmeImg>)
}

const ReadmeImg = (props: { width: string, height: string, children: any }) => {
  const { width, height, children } = props
  return (
    <svg
      fill="none"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <foreignObject width={width} height={height}>
        <div
          {...{ xmlns: "http://www.w3.org/1999/xhtml" }}
          style={{
            backgroundColor: "#e1e4e8",
            borderRadius: 5
          }}>
          <style>{`
              * {
                margin: 0;
                box-sizing: border-box;
              }
            `}</style>
          {children}
        </div>
      </foreignObject>
    </svg>
  );
};

const sizes : { [key:string]:number } = {
  default: 14,
  small: 12,
};

const colors : { [key:string]:string } = {
  default: "#24292e",
  "gray-light": "#e1e4e8",
  gray: "#586069",
  "gray-dark": "#24292e",
};

const families : { [key:string]:string } = {
  default:
    "-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji",
  mono: "SFMono-Regular,Consolas,Liberation Mono,Menlo,monospace",
};

const weights : { [key:string]:number } = {
  default: 400,
  bold: 600,
};

const Text: React.FC<any> = (args: {
  children: string,
  weight: string,
  family: string,
  color: string,
  size: string,
  id: string,
}) => {
  const weight = args.weight || "default"
  const family = args.family || "default"
  const color = args.color || "default"
  const size = args.size || "default"
  const id = args.id || ''

  return (
    <p
      style={{
        whiteSpace: "pre",
        fontSize: `${sizes[size]}px`,
        lineHeight: 1.5,
        fontFamily: families[family],
        color: colors[color],
        fontWeight: weights[weight],
      }}
      id={id}
    >
      {args.children}
    </p>
  );
};
