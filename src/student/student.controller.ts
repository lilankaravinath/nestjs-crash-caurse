import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import {
  CreateStudentDTO,
  FindStudentResponseDTO,
  StudentResponseDTO,
  UpdateStudentDTO,
} from './dto/student.dto';
import { StudentService } from './student.service';

@Controller('students')
export class StudentController {
  constructor(private studentService: StudentService) {}
  @Get()
  getStudents(): FindStudentResponseDTO[] {
    return this.studentService.getStudents();
  }

  /*
   *If want to extract the id from the route, we wanna do that trough request objects
   *request objects are just decorator
   * >>> if we wanna extract something from "express" typically we have,
   * >>> getStudentById(req, res) {
   * >>>  const { studentId } = req.params
   * >>> }
   * but in NEST, the concept is little bit different,
   * >>> getStudentById ( @Param() params: { studentId: string}) {
   * >>>  return console.log(params); //{ studentId: '1djada-s5d4a6-5sd6a4-das1a5'}
   * >>> }
   * or we can destructure the params,
   * >>> getStudentById ( @Param() params: { studentId: string}) {
   * >>>  const { studentId } = params; // but we have better way to do that in NEST, and belov you can see it
   * >>>  return console.log(params); //{ studentId: '1djada-s5d4a6-5sd6a4-das1a5'}
   * >>> }
   **/
  @Get('/:studentId')
  getStudentById(
    @Param('studentId') studentId: string,
  ): FindStudentResponseDTO {
    console.log(studentId);
    return this.studentService.getStudentById(studentId);
  }

  /*
   * typically we get the whole body itself, actully we don't extact it out
   **/
  @Post()
  createStudent(@Body() body: CreateStudentDTO): StudentResponseDTO {
    return this.studentService.createStudent(body);
  }

  @Put('/:studentId')
  updateStudent(
    @Param('studentId') studentId: string,
    @Body() body: UpdateStudentDTO,
  ): StudentResponseDTO {
    return this.studentService.udateStudent(body, studentId);
  }
}
