import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestUpdate } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  id!: string;
  request: RequestUpdate = {
    name: '',
    job: ''
  }

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    if (this.id) {
      this.userService.getUser(this.id).subscribe(res => {
        this.request.name = `${res.data.first_name} ${res.data.last_name}`
        
      });
    }
    else { alert('ERRO') }
  }
  update() {
    this.userService.updateUser(this.id, this.request).subscribe(res => {
      alert(`Atualizar: ${res.updatedAt}, Nome: ${res.name}, Job: ${res.job}`);
    });
  }

}