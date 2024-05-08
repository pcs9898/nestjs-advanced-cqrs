import { Test, TestingModule } from '@nestjs/testing';
import { MailService } from './mail.service';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { UserRole } from '../../common/enum/global-enum';

describe('MailService', () => {
  let mailService: MailService;
  let mockMailerService: any;
  let mockConfigService: any;

  beforeEach(async () => {
    mockMailerService = {
      sendMail: jest.fn(),
    };

    mockConfigService = {
      get: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailService,
        { provide: MailerService, useValue: mockMailerService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    mailService = module.get<MailService>(MailService);
  });

  it('should be defined', () => {
    expect(mailService).toBeDefined();
  });

  it('should Send Auth Code', async () => {
    // give
    const authCode = 123456;
    const email = 'email@example.com';
    const username = email.split('@')[0];
    mockMailerService.sendMail.mockResolvedValue(true);
    mockConfigService.get.mockReturnValue('sender@example.com');

    // when
    await mailService.sendAuthCode({ authCode, email });

    // then
    expect(mockMailerService.sendMail).toHaveBeenCalledWith({
      to: email,
      from: 'sender@example.com',
      subject: `Hello ${username}`,
      html: expect.any(String),
    });
  });

  it('should send find top 5 download videos', async () => {
    // give
    const testVideos = [
      {
        id: '1231deda',
        title: 'hiihi',
        createdAt: new Date(),
        downloadCnt: 1,
        mimetype: 'mp4',
        updatedAt: new Date(),
        user: {
          id: '12312312',
          email: 'oihaodas',
          password: 'oiahsoda',
          role: UserRole.Admin,
          isVerified: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          videos: [],
        },
      },
      {
        id: '1231deda',
        title: 'hiihi2',
        createdAt: new Date(),
        downloadCnt: 1,
        mimetype: 'mp4',
        updatedAt: new Date(),
        user: {
          id: '12312312',
          email: 'oihaodas',
          password: 'oiahsoda',
          role: UserRole.Admin,
          isVerified: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          videos: [],
        },
      },
    ];
    mockMailerService.sendMail.mockResolvedValue(true);
    mockConfigService.get.mockReturnValue('sender@example.com');

    // when
    await mailService.sendFindTop5downloadVideos(testVideos);

    //then
    expect(mockMailerService.sendMail).toHaveBeenCalledWith({
      to: 'sender@example.com',
      from: 'nesttube@nesttube.com',
      subject: 'Top 5 downloaded Videos by Nest Tube',
      html: expect.any(String),
    });

    // Check that the email body contains the titles of the videos
    for (const video of testVideos) {
      expect(mockMailerService.sendMail).toHaveBeenCalledWith(
        expect.objectContaining({
          html: expect.stringContaining(video.title),
        }),
      );
    }
  });
});
