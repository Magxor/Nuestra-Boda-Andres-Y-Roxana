import React, { useState } from 'react';
import { Photo } from '../types';
import { Camera, Download, FileArchive, X, ChevronLeft, ChevronRight, ImageOff } from 'lucide-react';
import ImageModal from './ImageModal';
import LazyImage from './LazyImage';

// --- DATOS DE FOTOS Y GALERÍAS (Reemplazar con tus links) ---

const civilPhotoLinks = [
  'https://od.lk/d/OTdfOTg4ODcyNjZf/SAL_4486.JPG', 'https://od.lk/d/OTdfOTg4ODcyNjdf/SAL_4488.JPG', 'https://od.lk/d/OTdfOTg4ODcyNjhf/SAL_4490.JPG',
  'https://od.lk/d/OTdfOTg4ODcyNzFf/SAL_4492.JPG', 'https://od.lk/d/OTdfOTg4ODcyNzZf/SAL_4495.JPG', 'https://od.lk/d/OTdfOTg4ODcyODFf/SAL_4496.JPG',
  'https://od.lk/d/OTdfOTg4ODcyODdf/SAL_4498.JPG', 'https://od.lk/d/OTdfOTg4ODcyOTFf/SAL_4499.JPG', 'https://od.lk/d/OTdfOTg4ODcyOTZf/SAL_4500.JPG',
  'https://od.lk/d/OTdfOTg4ODczMDNf/SAL_4501.JPG', 'https://od.lk/d/OTdfOTg4ODczMDlf/SAL_4503.JPG', 'https://od.lk/d/OTdfOTg4ODczMTFf/SAL_4504.JPG',
  'https://od.lk/d/OTdfOTg4ODczMTdf/SAL_4505.JPG', 'https://od.lk/d/OTdfOTg4ODczMThf/SAL_4506.JPG', 'https://od.lk/d/OTdfOTg4ODczMjJf/SAL_4507.JPG',
  'https://od.lk/d/OTdfOTg4ODczMjVf/SAL_4509.JPG', 'https://od.lk/d/OTdfOTg4ODczMzRf/SAL_4510.JPG', 'https://od.lk/d/OTdfOTg4ODczNDlf/SAL_4511.JPG',
  'https://od.lk/d/OTdfOTg4ODczNTZf/SAL_4512.JPG', 'https://od.lk/d/OTdfOTg4ODczNjZf/SAL_4513.JPG', 'https://od.lk/d/OTdfOTg4ODczNzRf/SAL_4514.JPG',
  'https://od.lk/d/OTdfOTg4ODczNzhf/SAL_4515.JPG', 'https://od.lk/d/OTdfOTg4ODczODRf/SAL_4517.JPG', 'https://od.lk/d/OTdfOTg4ODczODdf/SAL_4518.JPG',
  'https://od.lk/d/OTdfOTg4ODczOTNf/SAL_4520.JPG', 'https://od.lk/d/OTdfOTg4ODczOThf/SAL_4522.JPG', 'https://od.lk/d/OTdfOTg4ODc0MDRf/SAL_4524.JPG',
  'https://od.lk/d/OTdfOTg4ODc0MDVf/SAL_4526.JPG', 'https://od.lk/d/OTdfOTg4ODc0MDdf/SAL_4528.JPG', 'https://od.lk/d/OTdfOTg4ODc0MTBf/SAL_4530.JPG',
  'https://od.lk/d/OTdfOTg4ODc0MTZf/SAL_4532.JPG', 'https://od.lk/d/OTdfOTg4ODc0NDdf/SAL_4534.JPG', 'https://od.lk/d/OTdfOTg4ODc0NjFf/SAL_4535.JPG',
  'https://od.lk/d/OTdfOTg4ODc0NzJf/SAL_4537.JPG', 'https://od.lk/d/OTdfOTg4ODc0NzZf/SAL_4540.JPG', 'https://od.lk/d/OTdfOTg4ODc0Nzlf/SAL_4541.JPG',
  'https://od.lk/d/OTdfOTg4ODc0ODFf/SAL_4542.JPG', 'https://od.lk/d/OTdfOTg4ODc0ODZf/SAL_4545.JPG', 'https://od.lk/d/OTdfOTg4ODc1MDhf/SAL_4546.JPG',
  'https://od.lk/d/OTdfOTg4ODc1MzJf/SAL_4547.JPG', 'https://od.lk/d/OTdfOTg4ODc1Mzhf/SAL_4548.JPG', 'https://od.lk/d/OTdfOTg4ODc1NDJf/SAL_4549.JPG',
  'https://od.lk/d/OTdfOTg4ODc1NTNf/SAL_4555.JPG', 'https://od.lk/d/OTdfOTg4ODc1NjRf/SAL_4556.JPG', 'https://od.lk/d/OTdfOTg4ODc1NzRf/SAL_4559.JPG',
  'https://od.lk/d/OTdfOTg4ODc1Nzlf/SAL_4560.JPG', 'https://od.lk/d/OTdfOTg4ODc1ODlf/SAL_4561.JPG', 'https://od.lk/d/OTdfOTg4ODc1OTNf/SAL_4562.JPG',
  'https://od.lk/d/OTdfOTg4ODc2MDBf/SAL_4563.JPG', 'https://od.lk/d/OTdfOTg4ODc2MDVf/SAL_4564.JPG', 'https://od.lk/d/OTdfOTg4ODc2MTFf/SAL_4565.JPG',
  'https://od.lk/d/OTdfOTg4ODc2MTJf/SAL_4567.JPG', 'https://od.lk/d/OTdfOTg4ODc2MTlf/SAL_4568.JPG', 'https://od.lk/d/OTdfOTg4ODc2Mjlf/SAL_4575.JPG',
  'https://od.lk/d/OTdfOTg4ODc2NDNf/SAL_4589.JPG', 'https://od.lk/d/OTdfOTg4ODc2NTFf/SAL_4598.JPG', 'https://od.lk/d/OTdfOTg4ODc2NjBf/SAL_4601.JPG',
  'https://od.lk/d/OTdfOTg4ODc2NjVf/SAL_4603.JPG', 'https://od.lk/d/OTdfOTg4ODc2NjZf/SAL_4604.JPG', 'https://od.lk/d/OTdfOTg4ODc2NzNf/SAL_4606.JPG',
  'https://od.lk/d/OTdfOTg4ODc2ODRf/SAL_4608.JPG', 'https://od.lk/d/OTdfOTg4ODc2ODdf/SAL_4610.JPG', 'https://od.lk/d/OTdfOTg4ODc2OTNf/SAL_4613.JPG',
  'https://od.lk/d/OTdfOTg4ODc3MDJf/SAL_4614.JPG', 'https://od.lk/d/OTdfOTg4ODc3MDlf/SAL_4616.JPG', 'https://od.lk/d/OTdfOTg4ODc3MjFf/SAL_4619.JPG',
  'https://od.lk/d/OTdfOTg4ODc3MzRf/SAL_4629.JPG', 'https://od.lk/d/OTdfOTg4ODc3NDBf/SAL_4630.JPG', 'https://od.lk/d/OTdfOTg4ODc3NDNf/SAL_4632.JPG',
  'https://od.lk/d/OTdfOTg4ODc3NDhf/SAL_4635.JPG', 'https://od.lk/d/OTdfOTg4ODc3NTlf/SAL_4636.JPG', 'https://od.lk/d/OTdfOTg4ODc3NjNf/SAL_4639.JPG',
  'https://od.lk/d/OTdfOTg4ODc3Njhf/SAL_4640.JPG', 'https://od.lk/d/OTdfOTg4ODc3NzNf/SAL_4641.JPG', 'https://od.lk/d/OTdfOTg4ODc3ODJf/SAL_4642.JPG',
  'https://od.lk/d/OTdfOTg4ODc3ODVf/SAL_4643.JPG', 'https://od.lk/d/OTdfOTg4ODc3OTRf/SAL_4644.JPG', 'https://od.lk/d/OTdfOTg4ODc4MDFf/SAL_4645.JPG',
  'https://od.lk/d/OTdfOTg4ODc4MDNf/SAL_4646.JPG', 'https://od.lk/d/OTdfOTg4ODc4MDdf/SAL_4647.JPG', 'https://od.lk/d/OTdfOTg4ODc4MTdf/SAL_4648.JPG',
  'https://od.lk/d/OTdfOTg4ODc4MjFf/SAL_4651.JPG', 'https://od.lk/d/OTdfOTg4ODc4MzNf/SAL_4652.JPG', 'https://od.lk/d/OTdfOTg4ODc4Mzlf/SAL_4653.JPG',
  'https://od.lk/d/OTdfOTg4ODc4NDlf/SAL_4654.JPG', 'https://od.lk/d/OTdfOTg4ODc4NThf/SAL_4655.JPG', 'https://od.lk/d/OTdfOTg4ODc4NzBf/SAL_4658.JPG',
  'https://od.lk/d/OTdfOTg4ODc4NzZf/SAL_4660.JPG', 'https://od.lk/d/OTdfOTg4ODc4Nzdf/SAL_4663.JPG', 'https://od.lk/d/OTdfOTg4ODc4Nzlf/SAL_4664.JPG',
  'https://od.lk/d/OTdfOTg4ODc4ODZf/SAL_4666.JPG', 'https://od.lk/d/OTdfOTg4ODc4OTJf/SAL_4668.JPG', 'https://od.lk/d/OTdfOTg4ODc4OTdf/SAL_4671.JPG',
  'https://od.lk/d/OTdfOTg4ODc5MDhf/SAL_4673.JPG', 'https://od.lk/d/OTdfOTg4ODc5MTVf/SAL_4674.JPG', 'https://od.lk/d/OTdfOTg4ODc5MTdf/SAL_4675.JPG',
  'https://od.lk/d/OTdfOTg4ODc5MjVf/SAL_4680.JPG', 'https://od.lk/d/OTdfOTg4ODc5MzJf/SAL_4683.JPG', 'https://od.lk/d/OTdfOTg4ODc5MzZf/SAL_4685.JPG',
  'https://od.lk/d/OTdfOTg4ODc5NDdf/SAL_4686.jpg', 'https://od.lk/d/OTdfOTg4ODc5NTNf/SAL_4688.JPG', 'https://od.lk/d/OTdfOTg4ODc5NTRf/SAL_4689.JPG',
  'https://od.lk/d/OTdfOTg4ODc5NjFf/SAL_4690.JPG', 'https://od.lk/d/OTdfOTg4ODc5Njdf/SAL_4692.JPG', 'https://od.lk/d/OTdfOTg4ODc5NzNf/SAL_4694.JPG',
  'https://od.lk/d/OTdfOTg4ODc5Nzlf/SAL_4696.JPG', 'https://od.lk/d/OTdfOTg4ODc5OTFf/SAL_4697.JPG', 'https://od.lk/d/OTdfOTg4ODc5OThf/SAL_4698.JPG',
  'https://od.lk/d/OTdfOTg4ODgwMDZf/SAL_4699.JPG', 'https://od.lk/d/OTdfOTg4ODgwMTJf/SAL_4700.JPG', 'https://od.lk/d/OTdfOTg4ODgwMTlf/SAL_4701.JPG',
  'https://od.lk/d/OTdfOTg4ODgwMjdf/SAL_4702.JPG', 'https://od.lk/d/OTdfOTg4ODgwMzFf/SAL_4703.JPG', 'https://od.lk/d/OTdfOTg4ODgwMzJf/SAL_4704.JPG',
  'https://od.lk/d/OTdfOTg4ODgwMzhf/SAL_4707.JPG', 'https://od.lk/d/OTdfOTg4ODgwNDRf/SAL_4708.JPG', 'https://od.lk/d/OTdfOTg4ODgwNTBf/SAL_4709.JPG',
  'https://od.lk/d/OTdfOTg4ODgwNTJf/SAL_4710.JPG', 'https://od.lk/d/OTdfOTg4ODgwNTZf/SAL_4711.JPG', 'https://od.lk/d/OTdfOTg4ODgwNjNf/SAL_4712.JPG',
  'https://od.lk/d/OTdfOTg4ODgwNjhf/SAL_4714.JPG', 'https://od.lk/d/OTdfOTg4ODgwNzJf/SAL_4715.JPG', 'https://od.lk/d/OTdfOTg4ODgwNzNf/SAL_4716.JPG',
  'https://od.lk/d/OTdfOTg4ODgwODJf/SAL_4717.JPG', 'https://od.lk/d/OTdfOTg4ODgwOTBf/SAL_4718.JPG', 'https://od.lk/d/OTdfOTg4ODgwOTJf/SAL_4719.JPG',
  'https://od.lk/d/OTdfOTg4ODgwOThf/SAL_4720.JPG', 'https://od.lk/d/OTdfOTg4ODgxMDlf/SAL_4721.JPG', 'https://od.lk/d/OTdfOTg4ODgxMTZf/SAL_4723.JPG',
  'https://od.lk/d/OTdfOTg4ODgxMjFf/SAL_4724.JPG', 'https://od.lk/d/OTdfOTg4ODgxMjlf/SAL_4725.JPG', 'https://od.lk/d/OTdfOTg4ODgxMzBf/SAL_4726.JPG',
  'https://od.lk/d/OTdfOTg4ODgxMzdf/SAL_4727.JPG', 'https://od.lk/d/OTdfOTg4ODgxNDhf/SAL_4728.JPG', 'https://od.lk/d/OTdfOTg4ODgxNTdf/SAL_4729.JPG',
  'https://od.lk/d/OTdfOTg4ODgxNzFf/SAL_4730.JPG', 'https://od.lk/d/OTdfOTg4ODgxODNf/SAL_4731.JPG', 'https://od.lk/d/OTdfOTg4ODgxOTRf/SAL_4732.JPG',
  'https://od.lk/d/OTdfOTg4ODgyMDRf/SAL_4733.JPG', 'https://od.lk/d/OTdfOTg4ODgyMDVf/SAL_4734.JPG', 'https://od.lk/d/OTdfOTg4ODgyMTNf/SAL_4741.JPG',
  'https://od.lk/d/OTdfOTg4ODgyMjBf/SAL_4742.JPG', 'https://od.lk/d/OTdfOTg4ODgyMjFf/SAL_4743.JPG', 'https://od.lk/d/OTdfOTg4ODgyMjhf/SAL_4744.JPG',
  'https://od.lk/d/OTdfOTg4ODgyNDNf/SAL_4745.JPG', 'https://od.lk/d/OTdfOTg4ODgyNTVf/SAL_4746.JPG', 'https://od.lk/d/OTdfOTg4ODgyNTdf/SAL_4747.JPG',
  'https://od.lk/d/OTdfOTg4ODgyNjJf/SAL_4748.JPG', 'https://od.lk/d/OTdfOTg4ODgyNzNf/SAL_4749.JPG', 'https://od.lk/d/OTdfOTg4ODgyNzhf/SAL_4750.JPG',
  'https://od.lk/d/OTdfOTg4ODgyOTNf/SAL_4751.JPG', 'https://od.lk/d/OTdfOTg4ODgyOThf/SAL_4752.JPG', 'https://od.lk/d/OTdfOTg4ODgzMDNf/SAL_4753.JPG',
  'https://od.lk/d/OTdfOTg4ODgzMTJf/SAL_4754.JPG', 'https://od.lk/d/OTdfOTg4ODgzMTRf/SAL_4755.JPG', 'https://od.lk/d/OTdfOTg4ODgzMjBf/SAL_4756.JPG',
  'https://od.lk/d/OTdfOTg4ODgzMjZf/SAL_4757.JPG', 'https://od.lk/d/OTdfOTg4ODgzMzNf/SAL_4758.JPG', 'https://od.lk/d/OTdfOTg4ODgzMzZf/SAL_4759.JPG',
  'https://od.lk/d/OTdfOTg4ODgzNDNf/SAL_4760.JPG', 'https://od.lk/d/OTdfOTg4ODgzNDhf/SAL_4761.JPG', 'https://od.lk/d/OTdfOTg4ODgzNTNf/SAL_4762.JPG',
  'https://od.lk/d/OTdfOTg4ODgzNTVf/SAL_4763.JPG', 'https://od.lk/d/OTdfOTg4ODgzNjRf/SAL_4764.JPG', 'https://od.lk/d/OTdfOTg4ODgzNjlf/SAL_4767.JPG',
  'https://od.lk/d/OTdfOTg4ODgzNzRf/SAL_4769.JPG', 'https://od.lk/d/OTdfOTg4ODgzODBf/SAL_4775.JPG', 'https://od.lk/d/OTdfOTg4ODgzODlf/SAL_4777.JPG',
  'https://od.lk/d/OTdfOTg4ODgzOThf/SAL_4778.JPG', 'https://od.lk/d/OTdfOTg4ODg0MDdf/SAL_4781.JPG', 'https://od.lk/d/OTdfOTg4ODg0MjJf/SAL_4782.JPG',
  'https://od.lk/d/OTdfOTg4ODg0Mjhf/SAL_4784.JPG', 'https://od.lk/d/OTdfOTg4ODg0MzRf/SAL_4787.JPG', 'https://od.lk/d/OTdfOTg4ODg0Mzhf/SAL_4789.JPG',
  'https://od.lk/d/OTdfOTg4ODg0NDJf/SAL_4791.JPG', 'https://od.lk/d/OTdfOTg4ODg0NDhf/SAL_4793.JPG', 'https://od.lk/d/OTdfOTg4ODg0NTJf/SAL_4795.JPG',
  'https://od.lk/d/OTdfOTg4ODg0NjJf/SAL_4796.JPG', 'https://od.lk/d/OTdfOTg4ODg0Njdf/SAL_4798.JPG', 'https://od.lk/d/OTdfOTg4ODg0ODRf/SAL_4799.JPG',
  'https://od.lk/d/OTdfOTg4ODg0OTFf/SAL_4801.JPG', 'https://od.lk/d/OTdfOTg4ODg0OTlf/SAL_4802.JPG', 'https://od.lk/d/OTdfOTg4ODg1MDZf/SAL_4805.JPG',
  'https://od.lk/d/OTdfOTg4ODg1MDhf/SAL_4806.JPG', 'https://od.lk/d/OTdfOTg4ODg1MTZf/SAL_4807.JPG', 'https://od.lk/d/OTdfOTg4ODg1MjNf/SAL_4808.JPG',
  'https://od.lk/d/OTdfOTg4ODg1Mjhf/SAL_4810.JPG', 'https://od.lk/d/OTdfOTg4ODg1MzRf/SAL_4812.JPG', 'https://od.lk/d/OTdfOTg4ODg1Mzlf/SAL_4814.JPG',
  'https://od.lk/d/OTdfOTg4ODg1NDNf/SAL_4816.JPG', 'https://od.lk/d/OTdfOTg4ODg1NDZf/SAL_4817.JPG', 'https://od.lk/d/OTdfOTg4ODg1NThf/SAL_4819.JPG',
  'https://od.lk/d/OTdfOTg4ODg1NjJf/SAL_4823.JPG', 'https://od.lk/d/OTdfOTg4ODg1Njhf/SAL_4824.JPG', 'https://od.lk/d/OTdfOTg4ODg1NzVf/SAL_4826.JPG',
  'https://od.lk/d/OTdfOTg4ODg1Nzlf/SAL_4828.JPG', 'https://od.lk/d/OTdfOTg4ODg1ODVf/SAL_4830.JPG', 'https://od.lk/d/OTdfOTg4ODg1ODhf/SAL_4831.JPG',
  'https://od.lk/d/OTdfOTg4ODg1OTNf/SAL_4834.JPG', 'https://od.lk/d/OTdfOTg4ODg1OTlf/SAL_4836.JPG', 'https://od.lk/d/OTdfOTg4ODg2MDFf/SAL_4837.JPG',
  'https://od.lk/d/OTdfOTg4ODg2MDJf/SAL_4839.JPG', 'https://od.lk/d/OTdfOTg4ODg2MDZf/SAL_4841.JPG', 'https://od.lk/d/OTdfOTg4ODg2MTFf/SAL_4842.JPG',
  'https://od.lk/d/OTdfOTg4ODg2MTZf/SAL_4843.JPG', 'https://od.lk/d/OTdfOTg4ODg2MjJf/SAL_4844.JPG', 'https://od.lk/d/OTdfOTg4ODg2Mjdf/SAL_4847.JPG',
  'https://od.lk/d/OTdfOTg4ODg2MzFf/SAL_4848.JPG', 'https://od.lk/d/OTdfOTg4ODg2MzVf/SAL_4851.JPG', 'https://od.lk/d/OTdfOTg4ODg2NDJf/SAL_4854.JPG',
  'https://od.lk/d/OTdfOTg4ODg2NDRf/SAL_4855.JPG', 'https://od.lk/d/OTdfOTg4ODg2NTFf/SAL_4859.JPG', 'https://od.lk/d/OTdfOTg4ODg2NjBf/SAL_4860.JPG',
  'https://od.lk/d/OTdfOTg4ODg2NjNf/SAL_4863.JPG', 'https://od.lk/d/OTdfOTg4ODg2Njdf/SAL_4867.JPG', 'https://od.lk/d/OTdfOTg4ODg2NzVf/SAL_4870.JPG',
  'https://od.lk/d/OTdfOTg4ODg2ODJf/SAL_4873.JPG', 'https://od.lk/d/OTdfOTg4ODg2ODlf/SAL_4875.JPG', 'https://od.lk/d/OTdfOTg4ODg2OTJf/SAL_4878.JPG',
  'https://od.lk/d/OTdfOTg4ODg2OTZf/SAL_4880.JPG', 'https://od.lk/d/OTdfOTg4ODg3MDJf/SAL_4881.JPG', 'https://od.lk/d/OTdfOTg4ODg3MDdf/SAL_4882.JPG',
  'https://od.lk/d/OTdfOTg4ODg3MTJf/SAL_4883.JPG', 'https://od.lk/d/OTdfOTg4ODg3MThf/SAL_4884.JPG', 'https://od.lk/d/OTdfOTg4ODg3MjRf/SAL_4885.JPG',
  'https://od.lk/d/OTdfOTg4ODg3MzJf/SAL_4886.JPG', 'https://od.lk/d/OTdfOTg4ODg3Mzlf/SAL_4887.JPG', 'https://od.lk/d/OTdfOTg4ODg3NDNf/SAL_4888.JPG',
  'https://od.lk/d/OTdfOTg4ODg3NDdf/SAL_4889.JPG', 'https://od.lk/d/OTdfOTg4ODg3NTJf/SAL_4890.JPG', 'https://od.lk/d/OTdfOTg4ODg3NTZf/SAL_4891.JPG',
  'https://od.lk/d/OTdfOTg4ODg3NThf/SAL_4892.JPG', 'https://od.lk/d/OTdfOTg4ODg3NjFf/SAL_4893.JPG', 'https://od.lk/d/OTdfOTg4ODg3NjRf/SAL_4896.JPG',
  'https://od.lk/d/OTdfOTg4ODg3NjZf/SAL_4897.JPG', 'https://od.lk/d/OTdfOTg4ODg3NzJf/SAL_4898.JPG', 'https://od.lk/d/OTdfOTg4ODg3Nzhf/SAL_4899.JPG',
  'https://od.lk/d/OTdfOTg4ODg3ODVf/SAL_4900.JPG', 'https://od.lk/d/OTdfOTg4ODg3ODdf/SAL_4904.JPG', 'https://od.lk/d/OTdfOTg4ODg3OTJf/SAL_4906.JPG',
  'https://od.lk/d/OTdfOTg4ODg3OTdf/SAL_4907.JPG', 'https://od.lk/d/OTdfOTg4ODg4MDNf/SAL_4908.JPG', 'https://od.lk/d/OTdfOTg4ODg4MDVf/SAL_4909.JPG',
  'https://od.lk/d/OTdfOTg4ODg4MTNf/SAL_4910.JPG', 'https://od.lk/d/OTdfOTg4ODg4MjRf/SAL_4911.JPG', 'https://od.lk/d/OTdfOTg4ODg4Mjdf/SAL_4912.JPG',
  'https://od.lk/d/OTdfOTg4ODg4MzBf/SAL_4913.JPG', 'https://od.lk/d/OTdfOTg4ODg4MzFf/SAL_4915.JPG', 'https://od.lk/d/OTdfOTg4ODg4Mzhf/SAL_4916.JPG',
  'https://od.lk/d/OTdfOTg4ODg4NDNf/SAL_4918.JPG', 'https://od.lk/d/OTdfOTg4ODg4NDdf/SAL_4920.JPG', 'https://od.lk/d/OTdfOTg4ODg4NTVf/SAL_4921.JPG',
  'https://od.lk/d/OTdfOTg4ODg4NjJf/SAL_4922.JPG', 'https://od.lk/d/OTdfOTg4ODg4NjNf/SAL_4923.JPG', 'https://od.lk/d/OTdfOTg4ODg4NjZf/SAL_4924.JPG',
  'https://od.lk/d/OTdfOTg4ODg4Njhf/SAL_4926.JPG', 'https://od.lk/d/OTdfOTg4ODg4NzRf/SAL_4928.JPG', 'https://od.lk/d/OTdfOTg4ODg4NzVf/SAL_4929.JPG',
  'https://od.lk/d/OTdfOTg4ODg4ODRf/SAL_4930.JPG', 'https://od.lk/d/OTdfOTg4ODg4ODhf/SAL_4931.JPG', 'https://od.lk/d/OTdfOTg4ODg4OTNf/SAL_4933.JPG',
  'https://od.lk/d/OTdfOTg4ODg4OTVf/SAL_4934.JPG', 'https://od.lk/d/OTdfOTg4ODg4OTZf/SAL_4936.JPG', 'https://od.lk/d/OTdfOTg4ODg4OTdf/SAL_4937.JPG',
  'https://od.lk/d/OTdfOTg4ODg5MDJf/SAL_4939.JPG', 'https://od.lk/d/OTdfOTg4ODg5MDVf/SAL_4940.JPG', 'https://od.lk/d/OTdfOTg4ODg5MDZf/SAL_4948.JPG',
];

const civilPhotos: Photo[] = civilPhotoLinks.map((link, index) => ({
  id: index + 1,
  fullUrl: link,
  thumbnailUrl: link,
  alt: `Foto del Civil ${index + 1}`,
}));

const bodaPhotos: Photo[] = [];
const fiestaPhotos: Photo[] = [];

type Category = 'civil' | 'boda' | 'fiesta';

const galleriesData: Record<Category, { title: string; photos: Photo[]; downloadUrl: string | null }> = {
  civil: { 
    title: 'Civil', 
    photos: civilPhotos,
    downloadUrl: null 
  },
  boda: { 
    title: 'Boda', 
    photos: bodaPhotos,
    downloadUrl: null // Aún sin link
  },
  fiesta: { 
    title: 'Fiesta', 
    photos: fiestaPhotos,
    downloadUrl: null // Aún sin link
  },
};

// --------------------------------------------------


const PhotoGallery: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Category>('civil');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const galleries = galleriesData;
  const currentGallery = galleries[activeTab];
  const currentPhotos = currentGallery.photos;
  const currentDownloadUrl = currentGallery.downloadUrl;


  const handleOpenModal = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedImageIndex(null);
  };
  
  const handleNext = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prevIndex) => (prevIndex! + 1) % currentPhotos.length);
    }
  };

  const handlePrev = () => {
     if (selectedImageIndex !== null) {
      setSelectedImageIndex((prevIndex) => (prevIndex! - 1 + currentPhotos.length) % currentPhotos.length);
    }
  };


  const TabButton: React.FC<{ category: Category; title: string }> = ({ category, title }) => (
    <button
      onClick={() => setActiveTab(category)}
      className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ${
        activeTab === category
          ? 'bg-wedding-royal text-white shadow-lg'
          : 'bg-white text-slate-600 hover:bg-blue-50'
      }`}
    >
      {title}
    </button>
  );

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-center items-center gap-2 sm:gap-4 mb-12 p-2 bg-slate-100/80 rounded-full border border-slate-200/80 max-w-sm mx-auto">
        <TabButton category="civil" title="Civil" />
        <TabButton category="boda" title="Boda" />
        <TabButton category="fiesta" title="Fiesta" />
      </div>

      <div className="bg-white/60 backdrop-blur-md p-4 sm:p-8 rounded-3xl shadow-2xl border border-white/60 min-h-[400px] flex flex-col">
        {currentPhotos.length > 0 ? (
          <>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 border-b border-blue-100 pb-4">
               <h3 className="font-cinzel text-2xl sm:text-3xl text-slate-800 font-bold mb-3 sm:mb-0">Galería: {currentGallery.title}</h3>
                {currentDownloadUrl && (
                  <a 
                    href={currentDownloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-slate-800 text-white px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-wedding-royal transition-colors shadow-lg animate-pulse-glow"
                  >
                    <FileArchive className="w-4 h-4" />
                    Ver/Descargar Todas
                  </a>
                )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {currentPhotos.map((photo, index) => (
                <div
                  key={photo.id}
                  className="aspect-square rounded-lg overflow-hidden cursor-pointer group relative shadow-sm"
                  onClick={() => handleOpenModal(index)}
                >
                  <LazyImage src={photo.thumbnailUrl} alt={photo.alt} />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Camera className="w-8 h-8 text-white drop-shadow-lg" />
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : currentDownloadUrl ? (
          <div className="flex-grow flex flex-col items-center justify-center text-center p-8">
             <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6 ring-4 ring-blue-100/50">
                <Camera className="w-10 h-10 text-blue-300" />
             </div>
             <h3 className="font-cinzel text-3xl text-slate-700 font-bold">Galería del {currentGallery.title}</h3>
             <p className="text-slate-500 mt-2 font-serif max-w-md">
                La galería de fotos completa está alojada en un servicio externo. Haz clic en el botón para ver y descargar todas las imágenes.
             </p>
             <a 
                 href={currentDownloadUrl}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="mt-8 flex items-center gap-2 bg-slate-800 text-white px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-wedding-royal transition-colors shadow-lg animate-pulse-glow"
               >
                 <FileArchive className="w-5 h-5" />
                 Abrir Galería
               </a>
          </div>
        ) : (
          <div className="flex-grow flex flex-col items-center justify-center text-center p-8">
             <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6 ring-4 ring-blue-100/50">
                <ImageOff className="w-10 h-10 text-blue-300" />
             </div>
             <h3 className="font-cinzel text-3xl text-slate-700 font-bold">Próximamente...</h3>
             <p className="text-slate-500 mt-2 font-serif">
                Las fotos de la <span className="font-bold text-slate-600">{currentGallery.title}</span> estarán disponibles muy pronto. ¡Vuelve a visitarnos!
             </p>
          </div>
        )}
      </div>

      {selectedImageIndex !== null && (
         <ImageModal 
           photo={currentPhotos[selectedImageIndex]}
           onClose={handleCloseModal}
           onNext={handleNext}
           onPrev={handlePrev}
           hasNext={currentPhotos.length > 1}
           hasPrev={currentPhotos.length > 1}
         />
      )}
    </div>
  );
};

export default PhotoGallery;