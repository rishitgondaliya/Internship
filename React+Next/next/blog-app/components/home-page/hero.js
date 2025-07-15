import Image from "next/image";
import classes from "./hero.module.css";

export default function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/site/rishit.png"
          alt="rishit"
          height={300}
          width={300}
        />
      </div>
      <h1>Hi, I'm Rishit</h1>
      <p>I am a full stack developer intern, currently learning Next.js</p>
    </section>
  );
}
