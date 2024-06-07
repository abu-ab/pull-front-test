import { Injectable } from '@nestjs/common';
import * as path from 'path';
import puppeteer from 'puppeteer';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getPull(): Promise<string> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const absolutePath = path.resolve(__dirname, '..', 'static', 'base.html');
    console.log(absolutePath);
    await page.goto(`file://${absolutePath}`);

    const data = await page.evaluate(() => {
      const topics = Array.from(
        document.querySelectorAll('.content__default h3'),
      ).map((element) => (element as HTMLElement).innerText);
      const answers = Array.from(
        document.querySelectorAll('.content__default > ul'),
      ).map((element) => (element as HTMLElement).innerText);
      return { topics, answers };
    });

    console.log(data);
    console.log(data.topics.length);
    console.log(data.answers.length);
    await browser.close();
    return '';
  }
}
