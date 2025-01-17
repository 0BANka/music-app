import { Test, TestingModule } from '@nestjs/testing';
import { TrackHistoryService } from './track-history.service';

describe('TrackHistoryService', () => {
  let service: TrackHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrackHistoryService],
    }).compile();

    service = module.get<TrackHistoryService>(TrackHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
