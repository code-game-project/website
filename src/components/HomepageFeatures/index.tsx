import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
	title: 'Easy to Use',
	Svg: require('@site/static/img/features/easy.svg').default,
    description: (
      <>
		Only one command is required to quickly get started using CodeGame in your favorite programming language.
		The APIs are designed to be easy to use and abstract all of the complex network logic away from the user.
      </>
    ),
  },
  {
    title: 'Many Supported Languages',
    Svg: require('@site/static/img/features/languages.svg').default,
    description: (
      <>
		The CodeGame protocol is programming language agnostic.
		We provide libraries for many different programming languages including JavaScript/TypeScript, Go, C# and Java.
		If your favorite language is not supported, you can easily implement the protocol in a weekend.
      </>
    ),
  },
  {
    title: 'Powerful Tooling',
    Svg: require('@site/static/img/features/tooling.svg').default,
    description: (
      <>
		The <a href="https://github.com/code-game-project/codegame-cli">CodeGame CLI</a> provides an easy way to get started with writing a player for any CodeGame game
		and to keep versions in sync.
		The intuitive CGE language makes defining events for a game quick and easy and removes the need of manually writing definitions for every supported programming language.
      </>
    ),
  }
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
